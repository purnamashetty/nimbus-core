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
package com.anthem.oss.nimbus.core.domain.command.execution;

import static org.junit.Assert.assertNotNull;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;

import com.anthem.oss.nimbus.core.AbstractFrameworkIntegrationTests;
import com.anthem.oss.nimbus.core.domain.command.Behavior;
import com.anthem.oss.nimbus.core.domain.command.Command;
import com.anthem.oss.nimbus.core.domain.command.execution.process.SetFunctionHandler;
import com.anthem.oss.nimbus.core.domain.definition.Constants;

import test.com.anthem.oss.nimbus.core.testutils.CommandUtils;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class HierarchyMatchBasedBeanFinderTest extends AbstractFrameworkIntegrationTests {
	
	@Autowired HierarchyMatchBasedBeanFinder hierarchyMatchBasedBeanFinder;

	@Test
	public void test() {
		final Command command = CommandUtils.prepareCommand("/Acme/admin/p/testmappedmodel/_process?fn=_set", Behavior.$execute);
		assertNotNull(hierarchyMatchBasedBeanFinder.findMatchingBean(SetFunctionHandler.class, this.constructFunctionHandlerKey(command)));
	}
	
	private String constructFunctionHandlerKey(Command command){
		StringBuilder key = new StringBuilder();
		String functionName = command.getFirstParameterValue(Constants.KEY_FUNCTION.code);

		final String uri = command.getAbsoluteAlias();
		key.append(uri).append(".").append(command.getAction().toString())
		.append(Constants.SEPARATOR_BEHAVIOR_START.code).append(Behavior.$execute.getCode().replaceAll("_", ""))
		.append(Constants.REQUEST_PARAMETER_MARKER.code).append(Constants.KEY_FUNCTION.code).append("=").append(functionName);
		return key.toString();
	}	
	
}
