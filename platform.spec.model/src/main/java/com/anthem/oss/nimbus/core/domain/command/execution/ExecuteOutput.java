/**
 *
 *  Copyright 2012-2017 the original author or authors.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
/**
 * 
 */
package com.anthem.oss.nimbus.core.domain.command.execution;

import java.io.Serializable;

import com.anthem.oss.nimbus.core.domain.command.Behavior;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * @author Soham Chakravarti
 *
 */
@Getter @Setter @ToString
public class ExecuteOutput<T> implements Serializable{

	private static final long serialVersionUID = 1L;
	

	private T result;
	
	private ValidationResult validationResult;
	
	private ExecuteError executeException;
	
	
	public ExecuteOutput() { }
	
	public ExecuteOutput(T result) { 
		setResult(result);
	}
	
	
	
	@Getter @Setter @ToString(callSuper=true) @RequiredArgsConstructor
	public static class BehaviorExecute<T> extends ExecuteOutput<T> {
		
		private static final long serialVersionUID = 1L;
		
		final private Behavior b;
		
		
		public BehaviorExecute(Behavior b, T result) {
			this(b);
			setResult(result);
		}
	}
	
}
