<?php
/**
 * Output overview a booking.
 *
 * This template can be overridden by copying it to {yourtheme}/awebooking/checkout/overview.php.
 *
 * @see      http://docs.awethemes.com/awebooking/developers/theme-developers/
 * @author   awethemes
 * @package  AweBooking
 * @version  3.1.0
 *
 * @var \AweBooking\Model\Booking $booking
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>

<ul class="awebooking-booking-overview awebooking-thankyou-booking-details booking_details">
	<li class="awebooking-booking-overview__booking booking">
		<span><?php esc_html_e( 'Reservation ID:', 'awebooking' ); ?></span>
		<strong><?php echo esc_html( $booking->get_booking_number() ); ?></strong>
	</li>

	<li class="awebooking-booking-overview__booking status">
		<span><?php esc_html_e( 'Status:', 'awebooking' ); ?></span>
		<strong><?php echo esc_html( abrs_get_booking_status_name( $booking->get_status() ) ); ?></strong>
	</li>

	<li class="awebooking-booking-overview__date date">
		<span><?php esc_html_e( 'Date:', 'awebooking' ); ?></span>
		<strong><?php echo esc_html( abrs_format_date( $booking->get( 'date_created' ) ) ); ?></strong>
	</li>

	<?php if ( is_user_logged_in() && $booking->get( 'customer_email' ) && $booking->get( 'customer_id' ) === get_current_user_id() ) : ?>
		<li class="awebooking-booking-overview__email email">
			<span><?php esc_html_e( 'Email:', 'awebooking' ); ?></span>
			<strong><?php echo esc_html( $booking->get( 'customer_email' ) ); ?></strong>
		</li>
	<?php endif; ?>

	<?php if ( $payment_item = $booking->get_payments()->last() ) : ?>
		<li class="awebooking-booking-overview__payment-method method">
			<?php esc_html_e( 'Payment method:', 'awebooking' ); ?>
			<strong><?php echo wp_kses_post( $payment_item->get_method_title() ); ?></strong>
		</li>
	<?php endif; ?>

	<li class="awebooking-booking-overview__total total">
		<?php esc_html_e( 'Total:', 'awebooking' ); ?>
		<strong><?php abrs_price( $booking->get( 'total' ), $booking->get( 'currency' ) ); ?></strong>
	</li>
</ul>
