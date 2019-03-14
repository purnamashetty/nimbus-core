
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

import { Directive, OnInit, OnDestroy, Output, EventEmitter, HostListener, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { debounceTime } from 'rxjs/operators';
import { PageService } from './../../../../services/page.service';
import { LoggerService } from './../../../../services/logger.service';
import { FormGroup } from '@angular/forms';
import 'rxjs/add/operator/filter';
import { Store } from '@ngrx/store';
import { AppState } from './../../../../reducers';
import { ResetPostResponseProcessing } from './../../../../actions';
/**
 * \@author Sandeep.Mantha
 * 
 */
@Directive({
    selector: '[eventpropagation]'
  })
  export class EventPropagationDirective implements OnInit, OnDestroy{

    @Input() path:string;
    @Input() form:FormGroup;
    private clicksubject = new Subject();
    private subscription: Subscription;
    private srcElement: any;
    private storeSubscription: Subscription;
  
    @Output() clickEvnt = new EventEmitter();

    constructor(private pageService: PageService, private logger: LoggerService, private store: Store<AppState>) {
    }

    ngOnInit() {
      this.subscription = this.clicksubject.pipe(
        debounceTime(500)
      ).subscribe(
        e => { this.clickEvnt.emit(e) },
        err => { this.logger.error('Failed to emit click event' + JSON.stringify(err))}
      );

      this.storeSubscription = this.store.subscribe((data) => {
        const path = data['pageService']['postResponseProcessing$'];
        if (path === this.path) {
          if (this.form && this.form.valid) {
            this.srcElement.removeAttribute('disabled');
          } else {
            this.srcElement.removeAttribute('disabled');
          }
          this.store.dispatch(new ResetPostResponseProcessing());
        }
      });
    }

    @HostListener('click', ['$event'])
    clickEvent(event) {
      event.preventDefault();
      event.stopPropagation();
      if(this.path) {
        this.srcElement =  event.srcElement;
        this.srcElement.setAttribute('disabled', true);
      }
      this.clicksubject.next(event);
    }

    ngOnDestroy() {
      if(this.subscription) {
        this.subscription.unsubscribe();
      }
      if (this.storeSubscription) {
        this.storeSubscription.unsubscribe();
      }
    }
    
  }