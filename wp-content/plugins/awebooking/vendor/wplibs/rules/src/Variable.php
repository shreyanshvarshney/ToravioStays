<?php

namespace WPLibs\Rules;

use Ruler\VariableOperand;
use Ruler\Variable as Ruler_Variable;

class Variable extends Ruler_Variable implements \ArrayAccess {
	/**
	 * An array of mapping rules operators.
	 *
	 * @var array
	 */
	public static $operators = [
		// Compare operators.
		'equal'                 => \WPLibs\Rules\Operator\Equal::class,
		'not_equal'             => \WPLibs\Rules\Operator\Not_Equal::class,
		'in'                    => \WPLibs\Rules\Operator\In::class,
		'not_in'                => \WPLibs\Rules\Operator\Not_In::class,
		'less_than'             => \WPLibs\Rules\Operator\Less_Than::class,
		'less_than_or_equal'    => \WPLibs\Rules\Operator\Less_Than_Or_Equal::class,
		'greater_than'          => \WPLibs\Rules\Operator\Greater_Than::class,
		'greater_than_or_equal' => \WPLibs\Rules\Operator\Greater_Than_Or_Equal::class,
		'between'               => \WPLibs\Rules\Operator\Between::class,
		'not_between'           => \WPLibs\Rules\Operator\Not_Between::class,
		'begins_with'           => \WPLibs\Rules\Operator\Starts_With::class,
		'not_begins_with'       => \WPLibs\Rules\Operator\Not_Starts_With::class,
		'contains'              => \WPLibs\Rules\Operator\String_Contains::class,
		'not_contains'          => \WPLibs\Rules\Operator\String_Does_Not_Contain::class,
		'ends_with'             => \WPLibs\Rules\Operator\Ends_With::class,
		'not_ends_with'         => \WPLibs\Rules\Operator\Not_Ends_With::class,

		// Check operators.
		'is_empty'              => \WPLibs\Rules\Operator\Is_Empty::class,
		'is_not_empty'          => \WPLibs\Rules\Operator\Is_Not_Empty::class,
		'is_null'               => \WPLibs\Rules\Operator\Is_Null::class,
		'is_not_null'           => \WPLibs\Rules\Operator\Is_Not_Null::class,
	];

	/**
	 * The variable properties.
	 *
	 * @var array
	 */
	protected $properties = [];

	/**
	 * Handle dynamic calls to the operators.
	 *
	 * @param  string $method     The method name.
	 * @param  array  $parameters The method parameters.
	 * @return mixed
	 *
	 * @throws \BadMethodCallException
	 */
	public function __call( $method, $parameters ) {
		if ( ! array_key_exists( $method, static::$operators ) ) {
			throw new \BadMethodCallException( "The [{$method}] operator is not supported." );
		}

		$class = static::$operators[ $method ];

		$parameters = array_map( function( $var ) {
			return $this->as_variable( $var );
		}, $parameters );

		// Create new operator instance.
		$operator = new $class( $this, ...$parameters );

		return ( $operator instanceof VariableOperand )
			? $this->wrap_operator( $operator )
			: $operator;
	}

	/**
	 * Retrieve a Variable instance for the given variable.
	 *
	 * @param   mixed $variable The variable instance or value.
	 * @return \Ruler\Variable
	 */
	protected function as_variable( $variable ) {
		return ( $variable instanceof Ruler_Variable ) ? $variable : new Ruler_Variable( null, $variable );
	}

	/**
	 * Wrap a VariableOperand in a Variable instance.
	 *
	 * @param  \Ruler\VariableOperand $op The VariableOperand instance.
	 * @return \Ruler\Variable
	 */
	protected function wrap_operator( VariableOperand $op ) {
		return new static( null, $op );
	}

	/**
	 * Get a property (create new if not exists).
	 *
	 * @param  string $name  The property name.
	 * @param  mixed  $value The default value.
	 * @return \WPLibs\Rules\Variable_Property
	 */
	public function get_property( $name, $value = null ) {
		if ( ! array_key_exists( $name, $this->properties ) ) {
			$this->properties[ $name ] = new Variable_Property( $this, $name, $value );
		}

		return $this->properties[ $name ];
	}

	/**
	 * Set a property value.
	 *
	 * @param  string $name  The property name.
	 * @param  mixed  $value The property value.
	 * @return \WPLibs\Rules\Variable_Property
	 */
	public function set_property( $name, $value ) {
		$property = $this->get_property( $name );

		$property->setValue( $value );

		return $property;
	}

	/**
	 * Determine if the given offset exists.
	 *
	 * @param  string $offset The offset key.
	 * @return bool
	 */
	public function offsetExists( $offset ) {
		return isset( $this->properties[ $offset ] );
	}

	/**
	 * Get the value for a given offset.
	 *
	 * @param  string $offset The offset key.
	 * @return mixed
	 */
	public function offsetGet( $offset ) {
		return $this->get_property( $offset );
	}

	/**
	 * Set the value at the given offset.
	 *
	 * @param  string $offset The offset key.
	 * @param  mixed  $value  The offset value.
	 * @return void
	 */
	public function offsetSet( $offset, $value ) {
		$this->set_property( $offset, $value );
	}

	/**
	 * Unset the value at the given offset.
	 *
	 * @param  string $offset The offset key.
	 * @return void
	 */
	public function offsetUnset( $offset ) {
		unset( $this->properties[ $offset ] );
	}
}
