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
import { TestBed, async } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JL } from 'jsnlog';
import { SESSION_STORAGE, StorageServiceModule } from 'angular-webstorage-service';
import { Location } from '@angular/common';

import { CustomHttpClient } from './httpclient.service';
import { LoaderService } from './loader.service';
import { LoggerService } from './logger.service';
import { SessionStoreService, CUSTOM_STORAGE } from './session.store';
import { PrintService } from './print.service';
import { NmMessageService } from './toastmessage.service';
import { ExecuteException } from '../shared/app-config.interface';
import { Message } from './../shared/message';
import { ComponentTypes } from '../shared/param-annotations.enum';

let http, backend, service;

class MockLocation {
  back() { }
}

class MockLoggerService {
  error(a) {}
  info(a) {}
  debug(a) {}
  warn(a) {}
}

class MockSessionStoreService {
  setSessionId(a) {}
  get(a) {
    if (a === 'test1') {
      return null;
    }
    return 'test';
  }
  set(a, b) {}
}

class MockLoaderService {
  show() {}
  hide() {}
}

describe('NmMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: 'JSNLOG', useValue: JL },
        { provide: CUSTOM_STORAGE, useExisting: SESSION_STORAGE },
        { provide: LoggerService, useClass: MockLoggerService },
        { provide: SessionStoreService, useClass: MockSessionStoreService },
        { provide: LoaderService, useClass: MockLoaderService },
        { provide: Location, useClass: MockLocation},
        PrintService,
        CustomHttpClient,
        NmMessageService
      ],
      imports: [HttpClientTestingModule, HttpModule, StorageServiceModule, HttpClientTestingModule]
    });
    http = TestBed.get(HttpClient);
    backend = TestBed.get(HttpTestingController);
    service = TestBed.get(NmMessageService);
  });

    it('should be created', async(() => {
        expect(service).toBeTruthy();
    }));

    it('notifyErrorEvent() should call emitMessageEvent() with messageList[]', async(() => {
        const exec = new ExecuteException();
        exec.message = 'testing notifyErrorEvent';
        spyOn(service, 'emitMessageEvent').and.returnValue('');
        const message = new Message();
        message.context = ComponentTypes.toast.toString();
        message.messageArray = [{severity: 'error',  summary: 'Error Message',  detail: exec.message, life: 10000}];
        service.notifyErrorEvent(exec);
        expect(service.emitMessageEvent).toHaveBeenCalledWith([message]);
    }));

    it('createMessage() should call emitMessageEvent() with messageList[]', async(() => {
        const createMessage = {severity: 'error',  summary: 'Error Message',  detail: 'message detail', life: 10000};
        spyOn(service, 'emitMessageEvent').and.returnValue('');
        const message = new Message();
        message.context = ComponentTypes.toast.toString();
        message.messageArray = [createMessage];
        service.createMessage('test', [createMessage], 100);
        expect(service.emitMessageEvent).toHaveBeenCalledWith([message]);
    }));

    it('emitMessageEvent() should update messageEvent subject messsageList[]', async(() => {
        spyOn(service.messageEvent, 'next').and.callThrough();
        const message = new Message();
        message.context = ComponentTypes.toast.toString();
        service.emitMessageEvent([message]);
        expect(service.messageEvent.next).toHaveBeenCalledWith([message]);
    }));

}); 
