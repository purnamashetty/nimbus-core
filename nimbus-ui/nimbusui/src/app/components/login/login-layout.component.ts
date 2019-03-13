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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppBranding, Layout, FooterConfig } from '../../model/menu-meta.interface';
import { Param } from '../../shared/param-state';
import { LayoutService } from '../../services/layout.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Subscription } from 'rxjs';
/**
 * \@author Dinakar.Meda
 * \@whatItDoes 
 * 
 * \@howToUse 
 * 
 */
@Component({
    templateUrl: './login-layout.component.html'
})

export class LoginLayoutCmp implements OnInit, OnDestroy {
    private static LAYOUT: string = 'loginlayout';
    public topMenuItems: Param[];
    public branding: AppBranding;
    public footer: FooterConfig;
    storeSubscription: Subscription;

    constructor(private layoutSvc: LayoutService, private store: Store<AppState>) {

    }

    ngOnInit() {
        // initialize
        this.branding = {} as AppBranding;

        this.storeSubscription = this.store.subscribe((data) => {
            const layout: Layout = data['layout$'];
            if (layout) {
                this.branding = layout.topBar.branding;
                this.footer = layout.footer;
                this.topMenuItems = layout.topBar.headerMenus;
            }
        });
        this.layoutSvc.getLayout(LoginLayoutCmp.LAYOUT);
    }

    ngOnDestroy() {
        this.storeSubscription.unsubscribe();
    }
}
