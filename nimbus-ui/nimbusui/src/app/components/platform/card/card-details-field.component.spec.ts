'use strict';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/primeng';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { StorageServiceModule, SESSION_STORAGE } from 'angular-webstorage-service';
import { JL } from 'jsnlog';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Component, Input } from '@angular/core';

import { CardDetailsFieldComponent } from './card-details-field.component';
// import { InPlaceEditorComponent } from '../form/elements/inplace-editor.component';
import { InputText } from '../form/elements/textbox.component';
import { TextArea } from '../form/elements/textarea.component';
import { ComboBox } from '../form/elements/combobox.component';
import { DateTimeFormatPipe } from '../../../pipes/date.pipe';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { SelectItemPipe } from '../../../pipes/select-item.pipe';
import { CustomHttpClient } from '../../../services/httpclient.service';
import { DisplayValueDirective } from '../../../directives/display-value.directive';
import { InputLabel } from '../../platform/form/elements/input-label.component';
import { configureTestSuite } from 'ng-bullet';
import { setup, TestContext } from '../../../setup.spec';
// import * as data from '../../../payload.json';
import { Values, Param } from '../../../shared/param-state';
import * as data from './card-details-field-payload.json';
import { PageService } from './../../../services/page.service';
import { SessionStoreService, CUSTOM_STORAGE } from './../../../services/session.store';
import { LoaderService } from './../../../services/loader.service';
import { ConfigService } from './../../../services/config.service';
import { LoggerService } from '../../../services/logger.service';
import { AppInitService } from '../../../services/app.init.service';

let param: Param, fixture, hostComponent;

@Component({
  template: '<div></div>',
  selector: 'inplace-editor'
})
export class InPlaceEditorComponent {
  @Input() element: any;
}

const declarations = [
  CardDetailsFieldComponent,
  InPlaceEditorComponent,
  InputText,
  TextArea,
  ComboBox,
  DateTimeFormatPipe,
  TooltipComponent,
  SelectItemPipe,
  DisplayValueDirective,
  InputLabel
];
const imports = [FormsModule, DropdownModule, HttpClientModule, HttpModule, StorageServiceModule];
const providers = [    { provide: CUSTOM_STORAGE, useExisting: SESSION_STORAGE },
  SessionStoreService, CustomHttpClient, PageService, LoaderService, ConfigService, LoggerService,
  { provide: 'JSNLOG', useValue: JL },
  AppInitService,
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  Location,
];

describe('CardDetailsFieldComponent', () => {

  configureTestSuite(() => {
    setup( declarations, imports, providers);
  });
  
     let payload = '{\"activeValidationGroups\":[], \"config\":{\"code\":\"firstName\",\"desc\":{\"help\":\"firstName\",\"hint\":\"firstName\",\"label\":\"firstName\"},\"validation\":{\"constraints\":[{\"name\":\"NotNull\",\"value\":null,\"attribute\":{\"groups\": []}}]},\"values\":[],\"uiNatures\":[],\"enabled\":true,\"visible\":true,\"uiStyles\":{\"isLink\":false,\"isHidden\":false,\"name\":\"ViewConfig.TextBox\",\"value\":null,\"attributes\":{\"hidden\":false,\"readOnly\":false,\"alias\":\"TextBox\",\"labelClass\":\"anthem-label\",\"type\":\"text\",\"postEventOnChange\":false,\"controlId\":\"\"}},\"postEvent\":false},\"type\":{\"nested\":true,\"name\":\"string\",\"collection\":false,\"model\": {"\params\":[{\"activeValidationGroups\":[], \"config\":{\"code\":\"nestedName\",\"desc\":{\"help\":\"nestedName\",\"hint\":\"nestedName\",\"label\":\"nestedName\"},\"validation\":{\"constraints\":[{\"name\":\"NotNull\",\"value\":null,\"attribute\":{\"groups\": []}}]},\"values\":[],\"uiNatures\":[],\"enabled\":true,\"visible\":true,\"uiStyles\":{\"isLink\":false,\"isHidden\":false,\"name\":\"ViewConfig.TextBox\",\"value\":null,\"attributes\":{\"hidden\":false,\"readOnly\":false,\"alias\":\"TextBox\",\"labelClass\":\"anthem-label\",\"type\":\"text\",\"postEventOnChange\":false,\"controlId\":\"\"}},\"postEvent\":false},\"type\":{\"nested\":false,\"name\":\"string\",\"collection\":false},\"leafState\":\"testData\",\"path\":\"/page/memberSearch/memberSearch/memberSearch/nestedName\"}]}},\"leafState\":\"testData\",\"path\":\"/page/memberSearch/memberSearch/memberSearch/firstName\"}';     let param: Param = JSON.parse(payload);
  
  beforeEach( async(() => {
    fixture = TestBed.createComponent(CardDetailsFieldComponent);
    hostComponent = fixture.debugElement.componentInstance;
    hostComponent.element = payload;
  }));
  
  it('should create the CardDetailsFieldComponent',  async(() => {
    expect(hostComponent).toBeTruthy();
  }));

  // configureTestSuite();
  // setup(CardDetailsFieldComponent, declarations, imports, providers);
  // param = (<any>data).inplaceEditor;

  // beforeEach(async function(this: TestContext<CardDetailsFieldComponent>){
  //   this.hostComponent.element = param;
  // });

  // it('should create the CardDetailsFieldComponent', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   expect(this.hostComponent).toBeTruthy();
  // });

  // it('inplaceEditor should be created', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   this.fixture.detectChanges();
  //   const debugElement = this.fixture.debugElement;
  //   const inplaceEditor = debugElement.query(By.css('inplace-editor'));
  //   expect(inplaceEditor.name).toEqual('inplace-editor');
  // });

  // it('inplaceEditor should not be created', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   this.hostComponent.element.config.uiStyles.attributes.inplaceEdit = false;
  //   this.fixture.detectChanges();
  //   const debugElement = this.fixture.debugElement;
  //   const inplaceEditor = debugElement.query(By.css('inplace-editor'));
  //   expect(inplaceEditor).toBeFalsy();
  // });

  // it('inplaceEditor should not be created', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   this.hostComponent.element.config.uiStyles.attributes.imgSrc = 't';
  //   this.fixture.detectChanges();
  //   const debugElement = this.fixture.debugElement;
  //   const inplaceEditor = debugElement.query(By.css('inplace-editor'));
  //   expect(inplaceEditor).toBeFalsy();
  // });

  // it('inplaceLabel should be created', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   const iLabel = (<any>data).inputLabel;
  //   this.hostComponent.element = iLabel;
  //   this.fixture.detectChanges();
  //   const debugElement = this.fixture.debugElement;
  //   const inputLabel = debugElement.query(By.css('nm-input-label'));
  //   expect(inputLabel.name).toEqual('nm-input-label');
  // });

  // it('inputLabel should not be created', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   const iLabel = (<any>data).inputLabel;
  //   this.hostComponent.element = iLabel;
  //   this.hostComponent.element.config.uiStyles.attributes.showName = false;
  //   this.fixture.detectChanges();
  //   const debugElement = this.fixture.debugElement;
  //   const inputLabel = debugElement.query(By.css('nm-input-label'));
  //   expect(inputLabel).toBeFalsy();
  // });

  // it('inplaceLabel should be created', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   const iLabel = (<any>data).inputLabelNoDate;
  //   this.hostComponent.element = iLabel;
  //   this.fixture.detectChanges();
  //   const debugElement = this.fixture.debugElement;
  //   const inputLabel = debugElement.query(By.css('nm-input-label'));
  //   expect(inputLabel.name).toEqual('nm-input-label');
  // });

  // it('inputLabel should not be created', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   const iLabel = (<any>data).inputLabelNoDate;
  //   this.hostComponent.element = iLabel;
  //   this.hostComponent.element.config.uiStyles.attributes.showName = false;
  //   this.fixture.detectChanges();
  //   const debugElement = this.fixture.debugElement;
  //   const inputLabel = debugElement.query(By.css('nm-input-label'));
  //   expect(inputLabel).toBeFalsy();
  // });

  // it('ngOnInit() should update fieldClass property for cols:6', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   this.fixture.whenStable().then(() => {
  //     this.hostComponent.element.config.uiStyles.attributes.cols = '6';
  //     this.hostComponent.ngOnInit();
  //     expect((this.hostComponent as any).fieldClass).toEqual('col-sm-3');
  //   });
  // });

  // it('ngOnInit() should update fieldClass property for cols:4', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   this.fixture.whenStable().then(() => {
  //     this.hostComponent.element.config.uiStyles.attributes.cols = '4';
  //     this.hostComponent.ngOnInit();
  //     expect((this.hostComponent as any).fieldClass).toEqual('col-sm-3');
  //   });
  // });

  // it('ngOnInit() should update fieldClass property for cols:3', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   this.fixture.whenStable().then(() => {
  //     this.hostComponent.element.config.uiStyles.attributes.cols = '3';
  //     this.hostComponent.ngOnInit();
  //     expect((this.hostComponent as any).fieldClass).toEqual('col-sm-3');
  //   });
  // });

  // it('ngOnInit() should update fieldClass property for cols:2', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   this.fixture.whenStable().then(() => {
  //     this.hostComponent.element.config.uiStyles.attributes.cols = '2';
  //     this.hostComponent.ngOnInit();
  //     expect((this.hostComponent as any).fieldClass).toEqual('col-sm-3');
  //   });
  // });

  // it('ngOnInit() should update fieldClass property for cols:1', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   this.fixture.whenStable().then(() => {
  //     this.hostComponent.element.config.uiStyles.attributes.cols = '1';
  //     this.hostComponent.ngOnInit();
  //     expect((this.hostComponent as any).fieldClass).toEqual('col-sm-3');
  //   });
  // });

  // it('value property should be updated with element.leafstate', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   this.hostComponent.element.leafState = 'test';
  //   this.hostComponent.element.values = [];
  //   this.hostComponent.value = '';
  //   expect(this.hostComponent.value).toEqual('test');
  // });

  // it('value property should be updated with element.values.label', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   this.hostComponent.element.leafState = 'test';
  //   const testValue = new Values();
  //   testValue.code = 'test';
  //   testValue.label = 'tLabel';
  //   this.hostComponent.element.values = [testValue];
  //   this.hostComponent.value = '';
  //   expect(this.hostComponent.value).toEqual('tLabel');
  // });
  // it('value property should be updated with element.leafstate based on code', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   this.hostComponent.element.leafState = 'test';
  //   const testValue = new Values();
  //   testValue.code = 'test1';
  //   testValue.label = 'tLabel';
  //   this.hostComponent.element.values = [testValue];
  //   this.hostComponent.value = '';
  //   expect(this.hostComponent.value).toEqual('test');
  // });

  // it('registerOnChange() should update the onChange property', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   const test = () => {
  //     return true;
  //   };
  //   this.hostComponent.registerOnChange(test);
  //   expect(this.hostComponent.onChange).toEqual(test);
  // });

  // it('writeValue() shouls call onChange()', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   this.hostComponent.element.leafState = 'test';
  //   this.hostComponent.element.values = [];
  //   spyOn(this.hostComponent, 'onChange').and.callThrough();
  //   this.hostComponent.writeValue(123);
  //   this.hostComponent.writeValue(undefined);
  //   expect(this.hostComponent.onChange).toHaveBeenCalled();
  // });
  // it('registerOnTouched() should update the onTouched property', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   const test = () => {
  //     return true;
  //   };
  //   this.hostComponent.registerOnTouched(test);
  //   expect(this.hostComponent.onTouched).toEqual(test);
  // });

  // it('getComponentClass() should return array [testClass, col-sm-12, p-0, clearfix]', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   this.fixture.whenStable().then(() => {
  //     this.hostComponent.element.config.uiStyles.attributes.cols = '1';
  //     this.hostComponent.element.config.uiStyles.attributes.cssClass = 'testClass';
  //     expect(this.hostComponent.getComponentClass()).toEqual([
  //       'testClass',
  //       'p-0',
  //       'clearfix',
  //       'col-sm-12'
  //     ]);
  //   });
  // });

  // it('getComponentClass() should return array [testClass, col-sm-6, p-0, clearfix]', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   this.fixture.whenStable().then(() => {
  //     this.hostComponent.element.config.uiStyles.attributes.cols = '2';
  //     this.hostComponent.element.config.uiStyles.attributes.cssClass = 'testClass';
  //     expect(this.hostComponent.getComponentClass()).toEqual([
  //       'testClass',
  //       'p-0',
  //       'clearfix',
  //       'col-sm-6'
  //     ]);
  //   });
  // });

  // it('getComponentClass() should return array [testClass, col-sm-4, p-0, clearfix]', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   this.fixture.whenStable().then(() => {
  //     this.hostComponent.element.config.uiStyles.attributes.cols = '3';
  //     this.hostComponent.element.config.uiStyles.attributes.cssClass = 'testClass';
  //     expect(this.hostComponent.getComponentClass()).toEqual([
  //       'testClass',
  //       'p-0',
  //       'clearfix',
  //       'col-sm-4'
  //     ]);
  //   });
  // });

  // it('getComponentClass() should return array [testClass, col-sm-3, p-0, clearfix]', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   this.fixture.whenStable().then(() => {
  //     this.hostComponent.element.config.uiStyles.attributes.cols = '4';
  //     this.hostComponent.element.config.uiStyles.attributes.cssClass = 'testClass';
  //     expect(this.hostComponent.getComponentClass()).toEqual([
  //       'testClass',
  //       'p-0',
  //       'clearfix',
  //       'col-sm-3'
  //     ]);
  //   });
  // });

  // it('getComponentClass() should return array [testClass, col-sm-2, p-0, clearfix]', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   this.fixture.whenStable().then(() => {
  //     this.hostComponent.element.config.uiStyles.attributes.cols = '6';
  //     this.hostComponent.element.config.uiStyles.attributes.cssClass = 'testClass';
  //     expect(this.hostComponent.getComponentClass()).toEqual([
  //       'testClass',
  //       'p-0',
  //       'clearfix',
  //       'col-sm-2'
  //     ]);
  //   });
  // });

  // it('getComponentClass() should return array [testClass, col-sm-3, p-0, clearfix] when cols is empty', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   this.fixture.whenStable().then(() => {
  //     this.hostComponent.element.config.uiStyles.attributes.cols = '';
  //     this.hostComponent.element.config.uiStyles.attributes.cssClass = 'testClass';
  //     expect(this.hostComponent.getComponentClass()).toEqual([
  //       'testClass',
  //       'p-0',
  //       'clearfix',
  //       'col-sm-3'
  //     ]);
  //   });
  // });

  // it('value getter() should return _value property value', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   this.hostComponent.value = 'test';
  //   expect(this.hostComponent._value).toEqual('test');
  // });

  // it('set value() should update the value property', async function (this: TestContext<CardDetailsFieldComponent>) {
  //   this.hostComponent.element.leafState = 'test';
  //   const testValue = new Values();
  //   testValue.code = 'test1';
  //   this.hostComponent.element.values = [testValue];
  //   this.hostComponent.value = '';
  //   expect(this.hostComponent.value).toEqual('test');
  // });

});
