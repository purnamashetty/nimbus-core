/**
 * 
 */
package com.anthem.nimbus.platform.core.process.api.sa;


import lombok.Getter;
import lombok.Setter;

/**
 * @author AC67870
 *
 */
public class ServiceActivatorExecutionException extends ServiceActivatorException {

	private static final long serialVersionUID = 1L;
	
	
	public ServiceActivatorExecutionException() {
		super();
	}

	public ServiceActivatorExecutionException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public ServiceActivatorExecutionException(String message, Throwable cause) {
		super(message, cause);
	}

	public ServiceActivatorExecutionException(String message) {
		super(message);
	}

	public ServiceActivatorExecutionException(Throwable cause) {
		super(cause);
	}
	
	

}
