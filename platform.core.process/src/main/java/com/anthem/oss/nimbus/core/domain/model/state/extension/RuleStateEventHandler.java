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
package com.anthem.oss.nimbus.core.domain.model.state.extension;

import java.util.HashMap;
import java.util.Map;

import com.anthem.oss.nimbus.core.BeanResolverStrategy;
import com.anthem.oss.nimbus.core.domain.definition.InvalidConfigException;
import com.anthem.oss.nimbus.core.domain.definition.extension.Rule;
import com.anthem.oss.nimbus.core.domain.model.config.RulesConfig;
import com.anthem.oss.nimbus.core.domain.model.state.EntityState.Param;
import com.anthem.oss.nimbus.core.domain.model.state.RulesRuntime;
import com.anthem.oss.nimbus.core.domain.model.state.event.StateEventHandlers.OnStateChangeHandler;
import com.anthem.oss.nimbus.core.domain.model.state.event.StateEventHandlers.OnStateLoadHandler;
import com.anthem.oss.nimbus.core.domain.model.state.extension.AbstractConditionalStateEventHandler.EvalExprWithCrudActions;
import com.anthem.oss.nimbus.core.rules.RulesEngineFactory;
import com.anthem.oss.nimbus.core.util.JustLogit;

/**
 * Rule State Event handler for triggering one or more rule definitions during its 
 * OnStateLoad and OnStateChange events.
 * 
 * @author Tony Lopez (AF42192)
 *
 */
public class RuleStateEventHandler extends EvalExprWithCrudActions<Rule> 
		implements OnStateLoadHandler<Rule>, OnStateChangeHandler<Rule> {

	public static final JustLogit LOG = new JustLogit();
	
	private static final Map<String, RulesConfig> rulesConfigCache = new HashMap<>();
	
	private final RulesEngineFactory rulesEngineFactory;
	
	public RuleStateEventHandler(BeanResolverStrategy beanResolver) {
		super(beanResolver);
		this.rulesEngineFactory = this.beanResolver.get(RulesEngineFactory.class);
	}

	@Override
	protected void handleInternal(Param<?> onChangeParam, Rule configuredAnnotation) {
		
		for(final String ruleAlias: configuredAnnotation.value()) {
			
			// Build the rules runtime
			final RulesConfig rConfig = this.getRulesConfig(ruleAlias);
			if (null != rConfig) {
				
				final RulesRuntime rRuntime = this.rulesEngineFactory.createRuntime(rConfig);
				
				// Disallow defining @Rule with the same rule file as the root param.
				final Param<?> rootParam = onChangeParam.getRootDomain().getAssociatedParam();
				if (ruleAlias.equals(rootParam.getConfig().getCode())) {
					throw new InvalidConfigException("Found [@Rule(\"" + ruleAlias + "\")] on " + 
							onChangeParam.getParentModel().getConfig().getReferredClass() + "." + 
							onChangeParam.getConfig().getCode() + 
							". Rule file alias MUST differ from root param code: " + rootParam.getConfig().getCode());
				}
				
				// Execute the rules.
				this.execute(rRuntime, onChangeParam);
				
			} else {
				
				// Disallow a Rule annotation with a rule file alias that was not found.
				throw new InvalidConfigException("Found [@Rule(\"" + ruleAlias + "\")] on " + 
						onChangeParam.getParentModel().getConfig().getReferredClass() + "." + 
						onChangeParam.getConfig().getCode() + ", but rule file was not found.");
			}
		}
	}
	
	/**
	 * <p>Retrieves the <tt>RulesConfig</tt> for <tt>ruleAlias</tt>. If it has already been created,
	 * the returned value will be retrieved from a local cache relative to this StateEventHandler.</p>
	 * 
	 * @param ruleAlias The rule file alias
	 * @return the <tt>RulesConfig</tt> for <tt>ruleAlias</tt>
	 */
	private RulesConfig getRulesConfig(String ruleAlias) {
		// TODO : Consider moving this to global cache when implemented.
		return rulesConfigCache.computeIfAbsent(ruleAlias, k -> this.rulesEngineFactory.createConfig(k));
	}

	/**
	 * Executes the rules configured for <tt>rRuntime</tt> relative to the <tt>param</tt>.
	 * 
	 * @param rRuntime the <tt>RulesRuntime</tt> to execute.
	 * @param param the relative param from which the configured rules will execute.
	 */
	private void execute(RulesRuntime rRuntime, Param<?> param) {			
		rRuntime.start();
		rRuntime.fireRules(param);
		rRuntime.shutdown();
	}

}
