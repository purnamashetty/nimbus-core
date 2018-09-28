/**
 *  Copyright 2016-2018 the original author or authors.
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
package com.antheminc.oss.nimbus.domain.model.state.extension;

import java.util.Locale;

import org.junit.Assert;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.antheminc.oss.nimbus.domain.cmd.Command;
import com.antheminc.oss.nimbus.domain.cmd.CommandBuilder;
import com.antheminc.oss.nimbus.domain.model.state.AbstractStateEventHandlerTests;
import com.antheminc.oss.nimbus.domain.model.state.EntityState.Param;

/**
 * @author Tony Lopez
 * @author Andrew Jo
 *
 */
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class StyleConditionalStateEventHandlerTest extends AbstractStateEventHandlerTests {

	@Test
	public void t01_styleConditional_single() {

		Param<String> p_testMessageTextBox2 = getParam(
				"/sample_view/page_yellow/vtYellow/vsSampleForm/vfSampleForm/testMessageTextBox2");

		// Validate original style is not set
		Assert.assertNull(p_testMessageTextBox2.getStyle());

		// Trigger the style is set conditionally
		getParam("/sample_view/page_yellow/vtYellow/vsSampleForm/vfSampleForm/testWarningTextBox").setState(102);

		// Validate the style config is set
		Assert.assertEquals("Awesome_Textbox_2", getStyleText(p_testMessageTextBox2));
	}
	
	@Test
	public void t02_styleConditional_exclusive() {
		// Validate original styles are null
		Param<Integer> p_p6_exclusive = getParam("/sample_view/page_yellow/vtYellow/vsSampleForm/vfSampleForm/p6_exclusive");
		Param<Integer> p_p6_nonExclusive = getParam("/sample_view/page_yellow/vtYellow/vsSampleForm/vfSampleForm/p6_nonExclusive");
		Assert.assertNull(p_p6_exclusive.getStyle());
		Assert.assertNull(p_p6_nonExclusive.getStyle());
		
		// Trigger the exclusive style and check if it is set appropriately
		p_p6_exclusive.setState(20);
		Assert.assertEquals("I'm_greater_than_5!", getStyleText(p_p6_exclusive));
		
		// Trigger the non-exclusive style and check if it is set appropriately
		p_p6_nonExclusive.setState(20);
		Assert.assertEquals("I'm_greater_than_10!", getStyleText(p_p6_nonExclusive));
	}

	private <T> String getStyleText(Param<T> param) {
		return param.getStyle().getCssClass();
	}

	private <T> Param<T> getParam(String paramPath) {
		return _q.getRoot().findParamByPath(paramPath);
	}

	@Override
	protected Command createCommand() {
		Command cmd = CommandBuilder.withUri("/hooli/thebox/p/sample_view/_new").getCommand();
		return cmd;
	}
}
