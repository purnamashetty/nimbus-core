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
package com.anthem.oss.nimbus.core.domain.model.config;

import java.util.List;

import com.anthem.oss.nimbus.core.domain.definition.Repo;
import com.anthem.oss.nimbus.core.util.CollectionsTemplate;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Soham Chakravarti
 *
 */
public interface ModelConfig<T> extends EntityConfig<T> {
	
	public String getAlias();
	
	public String getDomainLifecycle();
	
	public Repo getRepo();

	//@JsonIgnore
	public List<? extends ParamConfig<?>> getParams();
	
	public ParamConfig<?> getIdParam();
	public ParamConfig<?> getVersionParam();
	
	public CollectionsTemplate<List<ParamConfig<?>>, ParamConfig<?>> templateParams();
	
	public RulesConfig getRulesConfig();

	@Override
	default MappedModelConfig<T, ?> findIfMapped() {
		return null;
	}
	
	default boolean isRoot() {
		return false;
	}
	
	public interface MappedModelConfig<T, M> extends ModelConfig<T>, MappedConfig<T, M> {
		@Override
		default boolean isMapped() {
			return true;
		}
		
		@Override
		default MappedModelConfig<T, M> findIfMapped() {
			return this;
		}
		
		@Override
		public ModelConfig<M> getMapsTo();
	}
	
}
