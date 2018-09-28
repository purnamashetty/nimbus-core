package com.antheminc.oss.nimbus.test.scenarios.s0.view;

import com.antheminc.oss.nimbus.domain.defn.MapsTo;
import com.antheminc.oss.nimbus.domain.defn.MapsTo.Path;
import com.antheminc.oss.nimbus.domain.defn.Model;
import com.antheminc.oss.nimbus.domain.defn.ViewConfig.Form;
import com.antheminc.oss.nimbus.domain.defn.ViewConfig.Section;
import com.antheminc.oss.nimbus.domain.defn.ViewConfig.TextBox;
import com.antheminc.oss.nimbus.domain.defn.ViewConfig.Tile;

import com.antheminc.oss.nimbus.domain.defn.extension.StyleConditional;
import com.antheminc.oss.nimbus.domain.defn.extension.StyleConditional.Condition;
import com.antheminc.oss.nimbus.domain.defn.extension.Style;

import com.antheminc.oss.nimbus.domain.defn.extension.MessageConditional;
import com.antheminc.oss.nimbus.test.scenarios.s0.core.SampleCoreEntity;

import lombok.Getter;
import lombok.Setter;


/**
 * 
 * 
 ** @author Andrew Jo - based off of page_aqua for StyleConditional
 */
@Getter @Setter @Model
public class VPSampleViewPageYellow {
	
	

		@Tile(size = Tile.Size.Large)
		private VTYellow vtYellow;
		
		@Getter @Setter @Model
		public static class VTYellow {
			
			
			
			@Section
			private VSSampleForm vsSampleForm;
			
		}
		
	
		
		@Model @Getter @Setter
		public static class VSSampleForm{
			@Form
			private VFSampleForm vfSampleForm;
			
		}
		@Model @Getter @Setter
		@MapsTo.Type(SampleCoreEntity.class)
		public static class VFSampleForm{
			
			@TextBox(postEventOnChange=true)
			@Path("/attr_int")
			@MessageConditional(when = "state == 101", message = "'This is a Test Warning Message'")
			@StyleConditional(targetPath = "/../testMessageTextBox2", condition = {
				@Condition(when = "state == 102", then = @Style(cssClass = "Awesome_Textbox_2")),
				@Condition(when = "state == 103", then = @Style(cssClass = "Super_Awesome_Textbox_2"))
			})
			private int testWarningTextBox;
			
			@TextBox(postEventOnChange=true)
			@MessageConditional(when="state == null", message="'This is a Test Warning Message'")
			private String testMessageTextBox2;
			
			@TextBox(postEventOnChange=true)
			@Path("/attr_String")
			@MessageConditional(when="state =='No'", message="findStateByPath('/../testWarningTextBox')")
			private String testWarningTextBox3;
			
			@TextBox(postEventOnChange = true)
			@StyleConditional(targetPath = "/", condition = {
				@Condition(when = "state == 'test-label-conditional-1'", then = @Style(cssClass = "Amazing_Label")),
				@Condition(when = "state == 'test-label-conditional-2'", then = @Style(cssClass = "Hello!"))
			})
			private String p4;
			
			private String p5;
			
			@StyleConditional(targetPath = "/", exclusive = true, condition = {
				@Condition(when = "state > 5", then = @Style(cssClass = "I'm_greater_than_5!")),
				@Condition(when = "state > 10", then = @Style(cssClass = "I'm_greater_than_10!"))
			})
			private int p6_exclusive;
			
			@StyleConditional(targetPath = "/", exclusive = false, condition = {
				@Condition(when = "state > 5", then = @Style(cssClass = "I'm_greater_than_5!")),
				@Condition(when = "state > 10", then = @Style(cssClass = "I'm_greater_than_10!"))
			})
			private int p6_nonExclusive;
			
		}
	}