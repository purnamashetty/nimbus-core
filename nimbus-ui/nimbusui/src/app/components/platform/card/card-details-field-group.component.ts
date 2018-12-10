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
import { Param } from '../../../shared/param-state';
import { BaseElement } from '../base-element.component';
import { ComponentTypes } from '../../../shared/param-annotations.enum';
import { WebContentSvc } from '../../../services/content-management.service';

/**
 * \@author Dinakar.Meda
 * \@whatItDoes 
 * 
 * \@howToUse 
 * 
 */
@Component({
    selector: 'nm-card-details-field-group',
    template:`
        <div [ngClass]="getComponentClass()">
            <nm-input-label *ngIf="!isLabelEmpty"
                [element]="element" 
                [required]="false">
            </nm-input-label>
            <ng-template ngFor let-field [ngForOf]="element?.type?.model?.params">
                <!-- FieldValue-->
                <ng-template [ngIf]="field.config?.uiStyles?.attributes?.alias == componentTypes.fieldValue.toString()">
                    <nm-card-details-field [element]="field" [(value)]="field.leafState"></nm-card-details-field>
                </ng-template>
            </ng-template>
        </div>
    `
})

export class CardDetailsFieldGroupComponent extends BaseElement {
    private fieldGroupClass: string = '';
    componentTypes = ComponentTypes;

    constructor(private _wcs: WebContentSvc) {
        super(_wcs);
    }
    
    getComponentClass() {
        let componentClass: string[] = [];
        if (this.cssClass) {
            componentClass.push(this.cssClass);
        }

        // Field Group Style
        if (this.element.config.uiStyles.attributes.cols === '6') { // occupies 1 cols of 6
            componentClass.push('col-sm-2');
        } else if (this.element.config.uiStyles.attributes.cols === '4') { // occupies 1 cols of 4
            componentClass.push('col-sm-3');
        } else if (this.element.config.uiStyles.attributes.cols === '3') { // occupies 1 cols of 3
            componentClass.push('col-sm-4');
        } else if (this.element.config.uiStyles.attributes.cols === '2') { // occupies 1 cols of 2
            componentClass.push('col-sm-6');
        } else if (this.element.config.uiStyles.attributes.cols === '1') { // occupies 1 col of 1
            componentClass.push('col-sm-12');
        } else {
            componentClass.push('col-sm-3');
        }

        return componentClass;
    }

    ngOnInit() {
        // console.log('this.element-82', this.element.type.model.params);
        // console.log('this.element-83', this.stringify(this.element.type.model.params[0]));
        // console.log('this.element-84', this.stringify(this.element.type.model.params[0].config));        
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

