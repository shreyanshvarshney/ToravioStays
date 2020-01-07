<?php

namespace AweBooking\Availability;

use AweBooking\Constants;
use AweBooking\Model\Room_Type;
use AweBooking\Model\Pricing\Contracts\Rate;
use AweBooking\Model\Pricing\Contracts\Rate_Interval;
use AweBooking\Model\Season;
use AweBooking\Support\Period;
use AweBooking\Support\Traits\Fluent_Getter;

class Room_Rate {
	use Fluent_Getter,
		Deprecated\Room_Rate;

	/**
	 * The res request.
	 *
	 * @var \AweBooking\Availability\Request
	 */
	protected $request;

	/**
	 * The room type instance.
	 *
	 * @var \AweBooking\Model\Room_Type
	 */
	protected $room_type;

	/**
	 * The rate instance.
	 *
	 * @var \AweBooking\Model\Pricing\Contracts\Rate
	 */
	protected $rate_plan;

	/**
	 * //
	 *
	 * @var \AweBooking\Model\Season
	 */
	protected $session;

	/**
	 * The room availability.
	 *
	 * @var \AweBooking\Availability\Availability
	 */
	protected $rooms_availability;

	/**
	 * The filtered rates.
	 *
	 * @var \AweBooking\Availability\Availability
	 */
	protected $rates_availability;

	/**
	 * The rate to retrieve the room price.
	 *
	 * @var \AweBooking\Model\Pricing\Contracts\Rate_Interval
	 */
	protected $room_rate;

	/**
	 * Store the breakdown of room rate.
	 *
	 * @var \AweBooking\Model\Pricing\Breakdown
	 */
	protected $breakdown;

	/**
	 * The additional rates add to to room cost.
	 *
	 * @var array
	 */
	protected $additional_rates = [];

	/**
	 * The additional rates breakdown.
	 *
	 * @var array
	 */
	protected $additional_breakdowns = [];

	/**
	 * Store the calculated prices.
	 *
	 * @var array
	 */
	protected $prices = [
		'room_only'        => 0,
		'additionals'      => 0,
		'rate'             => 0,
		'rate_average'     => 0,
		'rate_first_night' => 0,
	];

	/**
	 * Constructor.
	 *
	 * @param \AweBooking\Availability\Request         $request   The res request.
	 * @param \AweBooking\Model\Room_Type              $room_type The room type instance.
	 * @param \AweBooking\Model\Pricing\Contracts\Rate $rate_plan The rate instance.
	 */
	public function __construct( Request $request, Room_Type $room_type, Rate $rate_plan ) {
		$this->request   = $request;
		$this->room_type = $room_type;
		$this->rate_plan = $rate_plan;
		$this->precheck();
	}

	/**
	 * Setup the rooms availability and pricing.
	 *
	 * @return void
	 */
	public function setup() {
		$constraints = $this->request->get_constraints();

		// First, check the rooms availability.
		$room_response = abrs_check_room_states( $this->room_type->get_rooms(), $this->get_timespan(), Constants::STATE_AVAILABLE, $constraints );
		$this->rooms_availability = new Availability( $this->room_type, $room_response );

		$timespan  = $this->get_timespan();
		$intervals = $this->rate_plan->get_rate_intervals();

		// Check the rates availability.
		$rate_response = abrs_filter_rate_intervals( $intervals, $timespan );
		$this->rates_availability = new Availability( $this->rate_plan, $rate_response );

		if ( count( $this->rates_availability->remains() ) > 0 ) {
			$this->using( apply_filters( 'abrs_select_room_rate', $this->rates_availability->select(), $this->rates_availability, $this ) );

			do_action( 'abrs_setup_room_rate', $this );

			$this->calculate_costs();
		}
	}

	/**
	 * //
	 *
	 * @return Season|null
	 */
	protected function find_matches_seasons() {
		$sessions = abrs_get_seasons();

		return $sessions->first( function ( Season $session ) {
			if ( ! $session->get_start_date() || ! $session->get_end_date() ) {
				return false;
			}

			try {
				$session_period = new Period( $session->get_start_date(), $session->get_end_date() );
			} catch ( \Exception $e ) {
				return false;
			}

			return $session_period->contains(
				abrs_date( $this->get_timespan()->get_start_date() )
			);
		} );
	}

	/**
	 * Pre-validate the the request.
	 *
	 * @return void
	 */
	protected function precheck() {
		$this->request->get_timespan()->requires_minimum_nights( 1 );

		if ( $this->request->get_guest_counts()->get_totals() > $this->room_type->get( 'maximum_occupancy' ) ) {
			throw new \RuntimeException( esc_html__( 'Error: maximum occupancy.', 'awebooking' ) );
		}

		do_action( 'abrs_precheck_room_rate', $this );
	}

	/**
	 * Gets the res request instance.
	 *
	 * @return \AweBooking\Availability\Request
	 */
	public function get_request() {
		return $this->request;
	}

	/**
	 * Gets the room type instance.
	 *
	 * @return \AweBooking\Model\Room_Type
	 */
	public function get_room_type() {
		return $this->room_type;
	}

	/**
	 * Gets the rate instance.
	 *
	 * @return \AweBooking\Model\Pricing\Contracts\Rate
	 */
	public function get_rate_plan() {
		return $this->rate_plan;
	}

	/**
	 * Gets the rooms availability instance.
	 *
	 * @return \AweBooking\Availability\Availability|null
	 */
	public function get_availability() {
		return $this->rooms_availability;
	}

	/**
	 * Gets the rates availability instance.
	 *
	 * @return \AweBooking\Availability\Availability|null
	 */
	public function get_rates_availability() {
		return $this->rates_availability;
	}

	/**
	 * Gets the timespan.
	 *
	 * @return \AweBooking\Model\Common\Timespan
	 */
	public function get_timespan() {
		return $this->request->get_timespan();
	}

	/**
	 * Gets the guest counts.
	 *
	 * @return \AweBooking\Model\Common\Guest_Counts
	 */
	public function get_guest_counts() {
		return $this->request->get_guest_counts();
	}

	/**
	 * Determines if the room rate is visible or not.
	 *
	 * @return bool
	 */
	public function is_visible() {
		if ( count( $this->get_remain_rooms() ) === 0 ) {
			return false;
		}

		if ( is_null( $this->room_rate ) || $this->get_rate() <= 0 ) {
			return false;
		}

		return apply_filters( 'abrs_room_rate_visibility', true, $this );
	}

	/**
	 * Gets the remain rooms.
	 *
	 * @return \AweBooking\Support\Collection
	 */
	public function get_remain_rooms() {
		return $this->rooms_availability ? $this->rooms_availability->remains() : abrs_collect();
	}

	/**
	 * Gets the reject rooms.
	 *
	 * @return \AweBooking\Support\Collection
	 */
	public function get_reject_rooms() {
		return $this->rooms_availability ? $this->rooms_availability->excludes() : abrs_collect();
	}

	/**
	 * Sets the room rate (the room price).
	 *
	 * @param  \AweBooking\Model\Pricing\Contracts\Rate_Interval $rate The rate instance.
	 * @return $this
	 */
	public function using( Rate_Interval $rate ) {
		$availability = $this->rates_availability;

		if ( ! $availability->remain( $rate->get_id() ) ) {
			throw new \InvalidArgumentException( esc_html__( 'Invalid single rate.', 'awebooking' ) );
		}

		$this->room_rate = $rate;

		if ( 1 === $availability->remains()->count() ) {
			$breakdown = $this->retrieve_rate_breakdown( $rate );
		} else {
			$breakdown = $this->get_mixed_rates_breakdown( $rate,
				$availability->remains()->except( $rate->get_id() )
			);
		}

		$breakdown->set_label( esc_html__( 'Room Only', 'awebooking' ) );
		$this->breakdown = $breakdown;

		$this->calculate_costs();

		return $this;
	}

	/**
	 * //
	 *
	 * @param  \AweBooking\Model\Pricing\Contracts\Rate_Interval $main_rate
	 * @param  \AweBooking\Support\Collection                    $valid_rates
	 * @return \AweBooking\Model\Pricing\Breakdown
	 */
	public function get_mixed_rates_breakdown( Rate_Interval $main_rate, $valid_rates ) {
		// Start with main breakdown.
		$breakdown = $this->retrieve_rate_breakdown( $main_rate );

		$end_date     = abrs_date( $this->request->get_check_out() );
		$expires_date = $main_rate->get_expires_date();

		if ( ! $expires_date || $end_date->lte( abrs_date( $expires_date ) ) ) {
			return $breakdown;
		}

		foreach ( $breakdown as $day => $amount ) {
			$loop_day = abrs_date( $day );

			if ( $loop_day->lte( abrs_date( $expires_date ) ) ) {
				continue;
			}

			if ( $overlap_price = $this->find_overlaps_day_price( $loop_day, $valid_rates ) ) {
				$breakdown->set( $loop_day, $overlap_price );
			}
		}

		return apply_filters( 'abrs_get_mixed_rates_breakdown', $breakdown, $main_rate, $valid_rates, $this );
	}

	/**
	 * //
	 *
	 * @param  \AweBooking\Support\Carbonate  $loop_day
	 * @param  \AweBooking\Support\Collection $valid_rates
	 * @return float|null
	 */
	protected function find_overlaps_day_price( $loop_day, $valid_rates ) {
		// Cache the breakdown results.
		$cache_breakdowns = [];

		foreach ( $valid_rates as $rate_response ) {
			/* @var Rate_Interval $rate */
			$rate = $rate_response['resource'];

			// Checking the expires_date.
			$expires_date = $rate->get_expires_date();
			if ( $expires_date && $loop_day->gt( abrs_date( $expires_date ) ) ) {
				continue;
			}

			// Get the breakdown then put it into the cache to better performance.
			if ( ! isset( $cache_breakdowns[ $rate->get_id() ] ) ) {
				$cache_breakdowns[ $rate->get_id() ] = $this->retrieve_rate_breakdown( $rate );
			}

			$_breakdown = $cache_breakdowns[ $rate->get_id() ];

			if ( $price = $_breakdown->get( $loop_day ) ) {
				return $price;
			}
		}

		return null;
	}

	/**
	 * //
	 *
	 * @param  \AweBooking\Model\Pricing\Contracts\Rate_Interval $rate
	 * @return \AweBooking\Model\Pricing\Breakdown
	 */
	public function retrieve_rate_breakdown( Rate_Interval $rate ) {
		$breakdown = $rate->get_breakdown( $this->request->get_timespan() );

		if ( is_wp_error( $breakdown ) ) {
			throw new \RuntimeException( $breakdown->get_error_message() );
		}

		return $breakdown;
	}

	/**
	 * Add a additional rate.
	 *
	 * @param  \AweBooking\Model\Pricing\Contracts\Rate_Interval $rate   The rate instance.
	 * @param  string                                            $reason The reason message.
	 * @return $this
	 */
	public function additional( Rate_Interval $rate, $reason = '' ) {
		$key = $rate->get_id();

		if ( is_null( $this->room_rate ) ) {
			throw new \InvalidArgumentException( 'Do it wrong' );
		}

		if ( $this->room_rate->get_id() === $key ) {
			throw new \InvalidArgumentException( 'Can not add a duplicate rate.' );
		}

		$breakdown = $rate->get_breakdown( $this->request->get_timespan() );

		if ( is_wp_error( $breakdown ) ) {
			throw new \RuntimeException( $breakdown->get_error_message() );
		}

		if ( ! $breakdown->get_label() ) {
			$breakdown->set_label( $reason );
		}

		$breakdown = apply_filters( 'abrs_setup_additional_rate_breakdown', $breakdown, $rate, $reason, $this );

		$this->additional_rates[ $key ]      = compact( 'reason', 'rate' );
		$this->additional_breakdowns[ $key ] = $breakdown;
		$this->calculate_costs();

		return $this;
	}

	/**
	 * Perform calculate the prices.
	 *
	 * @return void
	 */
	public function calculate_costs() {
		if ( null === $this->room_rate ) {
			return;
		}

		$room_cost        = $this->breakdown->sum();
		$rate_average     = $this->breakdown->avg();
		$rate_first_night = $this->breakdown->first();
		$additional_cost  = 0;

		foreach ( $this->additional_breakdowns as $_breakdown ) {
			$additional_cost  += $_breakdown->sum();
			$rate_first_night += $_breakdown->avg();
			$rate_average     += $_breakdown->first();
		}

		$this->prices = apply_filters( 'abrs_room_rate_prices', [
			'room_only'        => $room_cost,
			'additionals'      => $additional_cost,
			'rate'             => $room_cost + $additional_cost,
			'rate_average'     => $rate_average,
			'rate_first_night' => $rate_first_night,
		], $this );
	}

	/**
	 * Gets the room rate.
	 *
	 * @return \AweBooking\Model\Pricing\Contracts\Rate_Interval|null
	 */
	public function get_room_rate() {
		return $this->room_rate;
	}

	/**
	 * Gets the rate breakdown.
	 *
	 * @return \AweBooking\Model\Pricing\Breakdown
	 */
	public function get_breakdown() {
		return $this->breakdown;
	}

	/**
	 * Gets the additional rates.
	 *
	 * @return array
	 */
	public function get_additional_rates() {
		return $this->additional_rates;
	}

	/**
	 * Gets the additional breakdowns.
	 *
	 * @return array
	 */
	public function get_additional_breakdowns() {
		return $this->additional_breakdowns;
	}

	/**
	 * Gets the rate (total).
	 *
	 * @return float
	 */
	public function get_rate() {
		return $this->prices['rate'];
	}

	/**
	 * Gets the rate.
	 *
	 * @param  string $type The price type.
	 * @return float
	 */
	public function get_price( $type = 'rate' ) {
		return array_key_exists( $type, $this->prices )
			? $this->prices[ $type ]
			: 0;
	}

	/**
	 * Returns the prices.
	 *
	 * @return array
	 */
	public function get_prices() {
		return $this->prices;
	}
}
