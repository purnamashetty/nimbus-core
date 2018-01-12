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
package com.anthem.oss.nimbus.core.web;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import com.anthem.oss.nimbus.core.FrameworkRuntimeException;
import com.anthem.oss.nimbus.core.domain.command.execution.CommandTransactionInterceptor;
import com.anthem.oss.nimbus.core.domain.command.execution.ExecuteOutput;
import com.anthem.oss.nimbus.core.domain.command.execution.MultiExecuteOutput;
import com.anthem.oss.nimbus.core.domain.command.execution.ValidationError;
import com.anthem.oss.nimbus.core.domain.command.execution.ValidationException;
import com.anthem.oss.nimbus.core.domain.command.execution.ValidationResult;
import com.anthem.oss.nimbus.core.util.JustLogit;

/**
 * @author Swetha Vemuri
 * @author Soham Chakravarti
 *
 */
@ControllerAdvice(assignableTypes=WebActionController.class)
public class WebActionControllerAdvice implements ResponseBodyAdvice<Object> {
	
	private JustLogit logit = new JustLogit(this.getClass());
	
	@Autowired CommandTransactionInterceptor interceptor;
	
	@Override
	public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
		return true;
	}
	
	@Override
	public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType, 
			Class<? extends HttpMessageConverter<?>> selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {
		
		logit.debug(()->"Processed response from "+WebActionController.class+": "
					+ "\n"+ body);
		
		MultiExecuteOutput multiOutput = interceptor.handleResponse(body);
		return multiOutput;
	}
	
	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler(FrameworkRuntimeException.class)
	@ResponseBody
	public MultiExecuteOutput exception(FrameworkRuntimeException pEx){
		logit.error(()->"Logging backing execute exception...",pEx);
		
		ExecuteOutput<?> resp = new ExecuteOutput<>();
		resp.setExecuteException(pEx.getExecuteError());
		return interceptor.handleResponse(resp);		
	}
	
	@ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
	@ExceptionHandler(ValidationException.class)
	@ResponseBody
	public MultiExecuteOutput exception(ValidationException vEx){	
		logit.error(()->"Logging backing validation exception...",vEx);
		
		ExecuteOutput<?> resp = new ExecuteOutput<>();
		resp.setValidationResult(vEx.getValidationResult());
		return interceptor.handleResponse(resp);
	}
	
	@ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseBody
	public MultiExecuteOutput exception(MethodArgumentNotValidException vEx){	
		logit.error(()->"Logging backing validation exception...",vEx);
		
		List<ValidationError> errors = new ArrayList<ValidationError>();
		if(vEx.getBindingResult()!=null && vEx.getBindingResult().getAllErrors()!=null){
			
			for(ObjectError objErr : vEx.getBindingResult().getAllErrors()){
				ValidationError err = new ValidationError(){};
				err.setCode(objErr.getCode());
				err.setMsg(objErr.getDefaultMessage());
				err.setModelAlias(objErr.getObjectName());
				errors.add(err);
			}
		}			
		
		ExecuteOutput<?> resp = new ExecuteOutput<>();		
		resp.setValidationResult(new ValidationResult());
		resp.getValidationResult().setErrors(errors);	
		
		return interceptor.handleResponse(resp);
	}
	
}
