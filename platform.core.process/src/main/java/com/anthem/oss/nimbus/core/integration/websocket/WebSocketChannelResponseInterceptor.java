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
package com.anthem.oss.nimbus.core.integration.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.integration.support.MessageBuilder;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.ChannelInterceptorAdapter;

import com.anthem.oss.nimbus.core.domain.command.execution.CommandTransactionInterceptor;
import com.anthem.oss.nimbus.core.domain.command.execution.MultiExecuteOutput;

/**
 * @author Soham Chakravarti
 *
 */
//@Component
public class WebSocketChannelResponseInterceptor extends ChannelInterceptorAdapter {

	@Autowired CommandTransactionInterceptor interceptor;
	
	@Override
	public Message<?> preSend(Message<?> message, MessageChannel channel) {
		Object payload = message.getPayload();
		MultiExecuteOutput output = interceptor.handleResponse(payload);
		
		Message<?> convertedMsg = MessageBuilder.withPayload(output).copyHeaders(message.getHeaders()).build();
		return convertedMsg;
	}
}
