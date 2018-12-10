import { BaseElement } from './../base-element.component';
/**
 * @license
 * Copyright 2016-2018 the original author or authors.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *        http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

import { Component, Input } from '@angular/core';
import { PageService } from '../../../services/page.service';
import { GenericDomain } from '../../../model/generic-domain.model';
import { Param } from '../../../shared/param-state';
import { ComponentTypes } from '../../../shared/param-annotations.enum';
import { WebContentSvc } from './../../../services/content-management.service';

/**
 * \@author Dinakar.Meda
 * \@whatItDoes 
 * 
 * \@howToUse 
 * 
 */
@Component({
    selector: 'nm-card-details-grid',
    templateUrl: './card-details-grid.component.html'
})

export class CardDetailsGrid extends BaseElement {

    public componentTypes = ComponentTypes;

    constructor(private pageSvc : PageService, private wcsv: WebContentSvc) {
        super(wcsv);
    }

    ngOnInit() {
        super.ngOnInit();

        this.labelSize = this.getHeaderSize(this.position);

        if (this.element.config.uiStyles.attributes.onLoad === true) {
            this.pageSvc.processEvent(this.element.path, '$execute', new GenericDomain(), 'GET');
        }
        setTimeout(() => {
            console.log('this.element--55', this.element);
            console.log('this.element--56', this.stringify(this.element.type.model.params[0]));            
            console.log('this.element--57', this.stringify(this.element.type.model.params[0].config));            
        }, 1000);

        // .type.model.params[0]
        
    }

    stringify(o) {
        let cache = [];
        return JSON.stringify(o, function(key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Duplicate reference found
                    try {
                        // If this value does not reference a parent it can be deduped
                        return JSON.parse(JSON.stringify(value));
                    } catch (error) {
                        // discard key if value cannot be deduped
                        return;
                    }
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        });
        cache = null;
    }

}
