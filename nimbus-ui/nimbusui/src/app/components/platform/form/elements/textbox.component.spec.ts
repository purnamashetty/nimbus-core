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
import { HttpModule } from '@angular/http';
import { InputLabel } from './input-label.component';
import { TooltipComponent } from './../../tooltip/tooltip.component';
import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormGroup, ValidatorFn, FormControl } from '@angular/forms';
import { Param } from '../../../../shared/param-state';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { InputText } from './textbox.component';
import { ControlSubscribers } from '../../../../services/control-subscribers.service';
import { configureTestSuite } from 'ng-bullet';
import { setup, TestContext } from '../../../../setup.spec';
import * as data from '../../../../payload.json';
import { PageService } from '../../../../services/page.service';
import { CustomHttpClient } from '../../../../services/httpclient.service';
import { SessionStoreService, CUSTOM_STORAGE } from '../../../../services/session.store';
import { StorageServiceModule, SESSION_STORAGE } from 'angular-webstorage-service';
import { LoaderService } from '../../../../services/loader.service';
import { ConfigService } from '../../../../services/config.service';
import { LoggerService } from '../../../../services/logger.service';
import { JL } from 'jsnlog';
import { AppInitService } from '../../../../services/app.init.service';

/**
 * \@author Sandeep.Mantha
 * \@whatItDoes 
 * 
 * \@howToUse 
 * 
 */

let  param: Param, controlService;

const declarations = [InputText, TooltipComponent, InputLabel];
const imports =  [ FormsModule, HttpClientTestingModule, HttpModule, StorageServiceModule ];

describe('InputText', () => {
    configureTestSuite();
    setup(InputText, declarations, imports);
    param = (<any>data).payload;
  
    beforeEach(async function(this: TestContext<InputText>) {
      const fg = new FormGroup({});
      const checks: ValidatorFn[] = [];
      checks.push(Validators.required);
      fg.addControl(param.config.code, new FormControl(param.leafState, checks));
      this.hostComponent.form = fg;
      this.hostComponent.element = param;
      controlService = TestBed.get(ControlSubscribers);
    });
  
    it('should create the InputText', async function (this: TestContext<InputText>) {
        expect(this.hostComponent).toBeTruthy();
    });

    it('form control value with default leafstate', async function (this: TestContext<InputText>) {
        this.fixture.whenStable().then(() => {
            this.fixture.detectChanges();
            expect(this.hostComponent.form.controls['firstName'].value).toBe('testData');
            expect(this.hostComponent).toBeTruthy();
        });
    });

    it('control validity', async function (this: TestContext<InputText>) {
        this.fixture.whenStable().then(() => {
            this.hostComponent.form.controls['firstName'].setValue('');
            this.fixture.detectChanges();
            expect(this.hostComponent.form.controls['firstName'].valid).toBeFalsy();
        });
    });

    it('post on focus out', async function (this: TestContext<InputText>) {
        this.fixture.whenStable().then(() => {
            this.fixture.detectChanges();
            spyOn(this.hostComponent, 'emitValueChangedEvent').and.callThrough();
            const textBox = this.fixture.debugElement.children[0].nativeElement;
            textBox.value = 'abcd123';
            textBox.dispatchEvent(new Event('input'));
            textBox.dispatchEvent(new Event('focusout'));
            this.fixture.detectChanges();
            expect(this.hostComponent.emitValueChangedEvent).toHaveBeenCalled();
        });
    });
  
});



// ------------


let fixture, app;

describe('InputText', () => {

    // const payload = '{\"activeValidationGroups\":[], \"config\":{\"code\":\"firstName\",\"desc\":{\"help\":\"firstName\",\"hint\":\"firstName\",\"label\":\"firstName\"},\"validation\":{\"constraints\":[{\"name\":\"NotNull\",\"value\":null,\"attribute\":{\"groups\": []}}]},\"values\":[],\"uiNatures\":[],\"enabled\":true,\"visible\":true,\"uiStyles\":{\"isLink\":false,\"isHidden\":false,\"name\":\"ViewConfig.TextBox\",\"value\":null,\"attributes\":{\"hidden\":false,\"readOnly\":false,\"alias\":\"TextBox\",\"labelClass\":\"anthem-label\",\"type\":\"text\",\"postEventOnChange\":false,\"controlId\":\"\"}},\"postEvent\":false},\"type\":{\"nested\":true,\"name\":\"string\",\"collection\":false,\"model\": {"\params\":[{\"activeValidationGroups\":[], \"config\":{\"code\":\"nestedName\",\"desc\":{\"help\":\"nestedName\",\"hint\":\"nestedName\",\"label\":\"nestedName\"},\"validation\":{\"constraints\":[{\"name\":\"NotNull\",\"value\":null,\"attribute\":{\"groups\": []}}]},\"values\":[],\"uiNatures\":[],\"enabled\":true,\"visible\":true,\"uiStyles\":{\"isLink\":false,\"isHidden\":false,\"name\":\"ViewConfig.TextBox\",\"value\":null,\"attributes\":{\"hidden\":false,\"readOnly\":false,\"alias\":\"TextBox\",\"labelClass\":\"anthem-label\",\"type\":\"text\",\"postEventOnChange\":false,\"controlId\":\"\"}},\"postEvent\":false},\"type\":{\"nested\":false,\"name\":\"string\",\"collection\":false},\"leafState\":\"testData\",\"path\":\"/page/memberSearch/memberSearch/memberSearch/nestedName\"}]}},\"leafState\":\"testData\",\"path\":\"/page/memberSearch/memberSearch/memberSearch/firstName\"}';
    // param = JSON.parse(payload);
    // param = (<any>data).payload;
    param = {
            "message": "",
            "gridData": {
                "elemId": "",
                "collectionParams": [],
                "leafState": [1],
                "stateMap": []
            },
            "collectionParams": [{"path": "/test/1/2"}],
            "activeValidationGroups": [],
            "config": {
                "code": "firstName",
                "desc": {
                    "help": "firstName",
                    "hint": "firstName",
                    "label": "firstName"
                },
                "validation": {
                    "constraints": [{
                        "name": "NotNull",
                        "value": null,
                        "attribute": {
                            "groups": []
                        }
                    }]
                },
                "values": [],
                "uiNatures": [],
                "enabled": true,
                "visible": true,
                "uiStyles": {
                    "isLink": false,
                    "isHidden": false,
                    "name": "ViewConfig.TextBox",
                    "value": null,
                    "attributes": {
                        "cols": "1",
                        "cssClass": "testClass",
                        "onLoad": true,
                        "lazyLoad": false,
                        "hidden": false,
                        "readOnly": false,
                        "alias": "TextBox",
                        "labelClass": "anthem-label",
                        "type": "text",
                        "postEventOnChange": false,
                        "controlId": "",
                        "pageSize": 1
                    }
                },
                "postEvent": false
            },
            "type": {
                "nested": true,
                "name": "string",
                "collection": false,
                "model": {
                    "params": [{
                        "activeValidationGroups": [],
                        "config": {
                            "code": "nestedName",
                            "desc": {
                                "help": "nestedName",
                                "hint": "nestedName",
                                "label": "nestedName"
                            },
                            "validation": {
                                "constraints": [{
                                    "name": "NotNull",
                                    "value": null,
                                    "attribute": {
                                        "groups": []
                                    }
                                }]
                            },
                            "values": [],
                            "uiNatures": [],
                            "enabled": true,
                            "visible": true,
                            "uiStyles": {
                                "isLink": false,
                                "isHidden": false,
                                "name": "ViewConfig.TextBox",
                                "value": null,
                                "attributes": {
                                    "cssClass": "",
                                    "hidden": false,
                                    "readOnly": false,
                                    "alias": "TextBox",
                                    "labelClass": "anthem-label",
                                    "type": "text",
                                    "postEventOnChange": false,
                                    "controlId": ""
                                }
                            },
                            "postEvent": false
                        },
                        "type": {
                            "nested": false,
                            "name": "string",
                            "collection": false
                        },
                        "leafState": "testData",
                        "path": "/page/memberSearch/memberSearch/memberSearch/nestedName"
                    }]
                }
            },
            "leafState": "testData",
            "path": "/page/memberSearch/memberSearch/memberSearch/firstName"
    };

  configureTestSuite();

  beforeAll(done => (async () => {

    TestBed.configureTestingModule({
      declarations: [
        InputText, TooltipComponent, InputLabel     
    ],
     imports: [
        FormsModule, HttpClientTestingModule, HttpModule, StorageServiceModule
     ],
     providers: [
        { provide: CUSTOM_STORAGE, useExisting: SESSION_STORAGE },
        { provide: 'JSNLOG', useValue: JL },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        Location,
        SessionStoreService,
        PageService,
        CustomHttpClient,
        LoaderService,
        ConfigService,
        LoggerService,
        AppInitService
     ]
    })

    await TestBed.compileComponents();
    
})().then(done).catch(done.fail));

  beforeEach(async(() => {
    const fg = new FormGroup({});
    const checks: ValidatorFn[] = [];
    checks.push(Validators.required);
    fg.addControl(param.config.code, new FormControl(param.leafState, checks));
    fixture = TestBed.createComponent(InputText);
    app = fixture.debugElement.componentInstance;
    app.form = fg;
    app.element = param;
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('form control value with default leafstate', async(() => {
    fixture.detectChanges();
    expect(app.form.controls['firstName'].value).toBe('testData');
    expect(app).toBeTruthy();
  }));

it('control validity', async(() => {
    app.form.controls['firstName'].setValue('');
    fixture.detectChanges();
    expect(app.form.controls['firstName'].valid).toBeFalsy();
  }));

it('post on focus out', async(() => {
    fixture.detectChanges();
    spyOn(app, 'emitValueChangedEvent').and.callThrough();
    const textBox = fixture.debugElement.children[0].nativeElement;
    textBox.value = 'abcd123';
    textBox.dispatchEvent(new Event('input'));
    textBox.dispatchEvent(new Event('focusout'));
    fixture.detectChanges();
    expect(app.emitValueChangedEvent).toHaveBeenCalled();
  }));

});