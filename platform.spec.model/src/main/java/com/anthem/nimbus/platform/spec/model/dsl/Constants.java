/**
 * 
 */
package com.anthem.nimbus.platform.spec.model.dsl;

/**
 * @author Soham Chakravarti
 *
 */
public enum Constants {

	MARKER_URI_PLATFORM("p"),
	MARKER_URI_BEHAVIOR("b"),
	
	SEPARATOR_URI("/"),
	SEPARATOR_URI_PLATFORM(SEPARATOR_URI.code + MARKER_URI_PLATFORM.code),	/* /p */
	
	SEPARATOR_URI_VALUE(":"),
	SEPARATOR_CONFIG_ATTRIB("#"),
	SEPARATOR_UNIQUE_KEYGEN("^"),
	
	SEPARATOR_AND("And"),
	
	PREFIX_FLOW("flow_"),
	PREFIX_DEFAULT("default."),
	PREFIX_EVENT("e"),
	PREFIX_EVENT_URI("e"+"_"),
	
	SUFFIX_PROPERTY_STATE("State"),
	
	CODE_VALUE_CONFIG_DELIMITER("-"),
	PARAM_VALUES_URI_PREFIX("*/*/*/p/"),
	PARAM_VALUES_URI_SUFFIX("/_search")
	
	;
	
	
	public final String code;
	
	
	private Constants(String code) {
		this.code = code;
	}
	
	@Override
	public String toString() {
		return "["+name() + " : " +code+"]";
	}
	
}
