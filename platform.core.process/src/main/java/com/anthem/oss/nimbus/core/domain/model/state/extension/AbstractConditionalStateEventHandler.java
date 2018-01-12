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
package com.anthem.oss.nimbus.core.domain.model.state.extension;

import java.lang.annotation.Annotation;
import java.util.EnumSet;
import java.util.Optional;
import java.util.function.Consumer;

import com.anthem.nimbus.platform.spec.model.dsl.binder.ParamStateHolder;
import com.anthem.oss.nimbus.core.BeanResolverStrategy;
import com.anthem.oss.nimbus.core.domain.command.Action;
import com.anthem.oss.nimbus.core.domain.definition.InvalidConfigException;
import com.anthem.oss.nimbus.core.domain.expr.ExpressionEvaluator;
import com.anthem.oss.nimbus.core.domain.model.state.EntityState.Param;
import com.anthem.oss.nimbus.core.domain.model.state.ExecutionTxnContext;
import com.anthem.oss.nimbus.core.domain.model.state.ParamEvent;
import com.anthem.oss.nimbus.core.domain.model.state.event.StateEventHandlers.OnStateChangeHandler;
import com.anthem.oss.nimbus.core.domain.model.state.event.StateEventHandlers.OnStateLoadHandler;

/**
 * @author Soham Chakravarti
 *
 */
public abstract class AbstractConditionalStateEventHandler {

	protected BeanResolverStrategy beanResolver;
	
	protected ExpressionEvaluator expressionEvaluator;
	
	public AbstractConditionalStateEventHandler(BeanResolverStrategy beanResolver) {
		this.beanResolver = beanResolver;
		this.expressionEvaluator = beanResolver.get(ExpressionEvaluator.class);
	}
	
	protected boolean evalWhen(Param<?> onChangeParam, String whenExpr) {
		return expressionEvaluator.getValue(whenExpr, new ParamStateHolder(onChangeParam), Boolean.class);
	}
	
	protected Param<?> retrieveParamByPath(Param<?> baseParam, String targetPath) {
		return Optional.ofNullable(baseParam.findParamByPath(targetPath))
				.orElseThrow(() -> new InvalidConfigException("Target param lookup returned null for targetPath: " + targetPath + " on param: " + baseParam));
	}
	
	protected static abstract class EvalExprWithCrudActions<A extends Annotation> extends AbstractConditionalStateEventHandler 
		implements OnStateLoadHandler<A>, OnStateChangeHandler<A> {
		
		public EvalExprWithCrudActions(BeanResolverStrategy beanResolver) {
			super(beanResolver);
		}
		
		@Override
		public void handle(A configuredAnnotation, Param<?> param) {
			handleInternal(param, configuredAnnotation);
		}
		
		@Override
		public void handle(A configuredAnnotation, ExecutionTxnContext txnCtx, ParamEvent event) {
			EnumSet<Action> validSet = EnumSet.of(Action._new, Action._update, Action._replace, Action._delete);
			
			if(!validSet.contains(event.getAction()))
				return;
			
			handleInternal(event.getParam(), configuredAnnotation);
		}
		
		protected abstract void handleInternal(Param<?> onChangeParam, A configuredAnnotation);
		
		protected void handleInternal(Param<?> onChangeParam, String targetPath, Consumer<Param<?>> executeCb) {
			Param<?> targetParam = retrieveParamByPath(onChangeParam, targetPath);

			executeCb.accept(targetParam);
		}
	}
}
