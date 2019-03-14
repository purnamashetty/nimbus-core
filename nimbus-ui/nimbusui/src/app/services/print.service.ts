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

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { PrintEvent, PrintConfig } from './../shared/print-event';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { LoadPrintClickUpdate$ } from '../actions';

@Injectable()
export class PrintService {

    constructor(private store: Store<AppState>) {}

    emitPrintEvent(printPath: string, uiEvent: UIEvent, printConfig: PrintConfig) {
        const printClickUpdate$ = {
            path: printPath,
            uiEvent: uiEvent,
            printConfig: printConfig
        };
        this.store.dispatch(new LoadPrintClickUpdate$({printClickUpdate$}));
    }
}