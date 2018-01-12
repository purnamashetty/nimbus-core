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
package com.anthem.oss.nimbus.test.sample.domain.model.ui;

import java.util.List;

import com.anthem.oss.nimbus.core.domain.definition.Domain;
import com.anthem.oss.nimbus.core.domain.definition.Execution.Config;
import com.anthem.oss.nimbus.core.domain.definition.Executions.Configs;
import com.anthem.oss.nimbus.core.domain.definition.MapsTo.Path;
import com.anthem.oss.nimbus.core.domain.definition.Repo;
import com.anthem.oss.nimbus.core.domain.definition.Repo.Cache;
import com.anthem.oss.nimbus.core.domain.definition.Repo.Database;
//AC12974@bitbucket.anthem.com/scm/nim/anthm-internal-oss-backend.git
import com.anthem.oss.nimbus.test.sample.domain.model.core.SampleCoreAssociatedEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * @author Rakesh Patel
 * Flow: Process Core Entity Update (attr_String)
 * Acronym: CEU
 *
 */
@Domain(value="ceu_sampleassociatedentity")
@Repo(value=Database.rep_none, cache=Cache.rep_device)
@Getter @Setter
public class CEU_SampleAssociatedEntity {

	private String entityId;
    
	@Path(linked=false)
	private List<SampleCoreAssociatedEntity> allAssociatedEntities;

	@Configs({
		@Config(url="/entityId/_update"),
		@Config(url="/allAssociatedEntities/_process?fn=_set&url=/p/sample_coreassociatedentity/_search?fn=query&where=sample_coreassociatedentity.entityId.eq('<!/entityId!>')"),
		@Config(url="/p/sample_coreassociatedentity:<!col/id!>/status/_update?rawPayload=\"Cancelled\"", col="<!/allAssociatedEntities!>")
	})
    public String action_updateStatus;
   
}