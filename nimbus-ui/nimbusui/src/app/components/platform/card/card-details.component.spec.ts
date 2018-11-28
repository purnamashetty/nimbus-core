'use strict';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/primeng';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { By } from '@angular/platform-browser';

import { CardDetailsComponent } from './card-details.component';
import { Link } from '../link.component';
import { CardDetailsFieldComponent } from './card-details-field.component';
import { StaticText } from '../content/static-content.component';
import { InPlaceEditorComponent } from '../form/elements/inplace-editor.component';
import { InputText } from '../form/elements/textbox.component';
import { TextArea } from '../form/elements/textarea.component';
import { ComboBox } from '../form/elements/combobox.component';
import { DateTimeFormatPipe } from '../../../pipes/date.pipe';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { SelectItemPipe } from '../../../pipes/select-item.pipe';
import { PageService } from '../../../services/page.service';
import { CustomHttpClient } from '../../../services/httpclient.service';
import { LoaderService } from '../../../services/loader.service';
import { ConfigService } from '../../../services/config.service';
import { CardDetailsFieldGroupComponent } from './card-details-field-group.component';
import { Paragraph } from '../content/paragraph.component';
import { ButtonGroup } from '../../platform/form/elements/button-group.component';
import { Label } from '../content/label.component';
import { DisplayValueDirective } from '../../../directives/display-value.directive';
import { InputLabel } from '../../platform/form/elements/input-label.component';
import { Button } from '../../platform/form/elements/button.component';
import { Image } from '../../platform/image.component';
import { SvgComponent } from '../../platform/svg/svg.component';
import { configureTestSuite } from 'ng-bullet';
import { setup, TestContext } from '../../../setup.spec';
import * as data from '../../../payload.json';

let param, pageService;

class MockPageService {
    processEvent() {    }
}

const declarations = [
  CardDetailsComponent,
  Link,
  CardDetailsFieldComponent,
  StaticText,
  InPlaceEditorComponent,
  InputText,
  TextArea,
  ComboBox,
  DateTimeFormatPipe,
  TooltipComponent,
  SelectItemPipe,
  CardDetailsFieldGroupComponent,
  Paragraph,
  ButtonGroup,
  Label,
  DisplayValueDirective,
  InputLabel,
  Button,
  Image,
  SvgComponent
];
const imports = [
  FormsModule,
  DropdownModule,
  HttpModule,
  HttpClientModule,
  AngularSvgIconModule
];
const providers = [
  { provide: PageService, useClass: MockPageService },
  CustomHttpClient,
  LoaderService,
  ConfigService
];

describe('CardDetailsComponent', () => {

  configureTestSuite();
  setup(CardDetailsComponent, declarations, imports, providers);
  param = (<any>data).payload;

  beforeEach(async function(this: TestContext<CardDetailsComponent>){
    this.hostComponent.element = param;
    pageService = TestBed.get(PageService);
  });

  // it('should create the Label', async function (this: TestContext<CardDetailsComponent>) {
  //   this.fixture.detectChanges();
  //   const debugElement = this.fixture.debugElement;
  //   const Label = debugElement.query(By.css('nm-label'));
  //   expect(Label.name).toEqual('nm-label');
  // });

  it('should create the CardDetailsComponent', async function (this: TestContext<CardDetailsComponent>) {
    expect(this.hostComponent).toBeTruthy();
  });

  it('toggle() should updated opened property', async function (this: TestContext<CardDetailsComponent>) {
    this.hostComponent.opened = true;
    this.hostComponent.toggle();
    expect(this.hostComponent.opened).toEqual(false);
  });

  it('processOnClick() should call pageService.processEvent', async function (this: TestContext<CardDetailsComponent>) {
    this.hostComponent.element.path = '/a';
    spyOn(pageService, 'processEvent').and.callThrough();
    this.hostComponent.processOnClick();
    expect(pageService.processEvent).toHaveBeenCalled();
  });

  it('getAllURLParams should return null matching the regexp', async function (this: TestContext<CardDetailsComponent>) {
    expect(this.hostComponent.getAllURLParams('/webhp?hl=en')).toEqual(null);
  });

  it('getAllURLParams should return string matching the regexp', async function (this: TestContext<CardDetailsComponent>) {
    expect(this.hostComponent.getAllURLParams('{ /webhp?hl=en}')).toEqual(['{ /webhp?hl=en}']);
  });

  it('toggleState() should update isHidden and _state properties', async function (this: TestContext<CardDetailsComponent>) {
    this.hostComponent.state = 'closedPanel';
    this.hostComponent.isHidden = true;
    this.hostComponent.toggleState();
    expect(this.hostComponent.isHidden).toBeFalsy();
    expect((this.hostComponent as any)._state).toEqual('openPanel');
  });

  it('toggleState() should update _state property', async function (this: TestContext<CardDetailsComponent>) {
    this.hostComponent.state = 'openPanel';
    this.hostComponent.toggleState();
    expect((this.hostComponent as any)._state).toEqual('closedPanel');
  });

  it('animationDone() should update the isHidden property', async function (this: TestContext<CardDetailsComponent>) {
    this.hostComponent.state = 'closedPanel';
    this.hostComponent.animationDone('a');
    expect(this.hostComponent.isHidden).toBeTruthy();
  });

});

const element: any = {
  "config": {
      "active": false,
      "required": false,
      "id": "3980",
      "code": "vcdOwnerInfo",
      "validations": null,
      "uiNatures": [],
      "uiStyles": {
          "isLink": false,
          "isHidden": false,
          "name": "ViewConfig.CardDetail",
          "attributes": {
              "hidden": false,
              "readOnly": false,
              "submitButton": true,
              "showName": true,
              "pageSize": 25,
              "browserBack": false,
              "showAsLink": false,
              "border": false,
              "cssClass": "contentBox right-gutter bg-alternate mt-0",
              "draggable": false,
              "expandable": true,
              "editable": false,
              "modelPath": "",
              "alias": "CardDetail",
              "imgSrc": ""
          }
      },
      "type": {
          "collection": false,
          "nested": true,
          "name": "VPOwnerInfo.VCDOwnerInfo",
          "model": {
              "paramConfigIds": [
                  "3982",
                  "3992"
              ]
          }
      }
  },
  "enabled": true,
  "visible": true,
  "activeValidationGroups": [],
  "collectionParams": [],
  "configId": "3980",
  "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo",
  "type": {
      "model": {
          "params": [
              {
                  "enabled": true,
                  "visible": true,
                  "activeValidationGroups": [],
                  "collectionParams": [],
                  "configId": "3982",
                  "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo/vcdbOwner",
                  "type": {
                      "model": {
                          "params": [                          ]
                      }
                  },
                  "message": [],
                  "values": [],
                  "labels": [],
                  "elemLabels": {}
              },
              {
                  "enabled": true,
                  "visible": true,
                  "activeValidationGroups": [],
                  "collectionParams": [],
                  "configId": "3992",
                  "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo/vcdbOwner1",
                  "type": {
                      "model": {
                          "params": [
                              {
                                  "enabled": true,
                                  "visible": true,
                                  "activeValidationGroups": [],
                                  "collectionParams": [],
                                  "configId": "3994",
                                  "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo/vcdbOwner1/vbgDefault1",
                                  "type": {
                                      "model": {
                                          "params": [
                                              {
                                                  "enabled": true,
                                                  "visible": true,
                                                  "activeValidationGroups": [],
                                                  "collectionParams": [],
                                                  "configId": "3996",
                                                  "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo/vcdbOwner1/vbgDefault1/submit",
                                                  "type": {
                                                      "nested": false,
                                                      "name": "string",
                                                      "collection": false
                                                  },
                                                  "message": [],
                                                  "values": [],
                                                  "labels": [
                                                      {
                                                          "locale": "en-US",
                                                          "text": "Submit"
                                                      }
                                                  ],
                                                  "elemLabels": {}
                                              },
                                              {
                                                  "enabled": true,
                                                  "visible": true,
                                                  "activeValidationGroups": [],
                                                  "collectionParams": [],
                                                  "configId": "3997",
                                                  "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo/vcdbOwner1/vbgDefault1/back",
                                                  "type": {
                                                      "nested": false,
                                                      "name": "string",
                                                      "collection": false
                                                  },
                                                  "message": [],
                                                  "values": [],
                                                  "labels": [
                                                      {
                                                          "locale": "en-US",
                                                          "text": "Back"
                                                      }
                                                  ],
                                                  "elemLabels": {}
                                              }
                                          ]
                                      }
                                  },
                                  "message": [],
                                  "values": [],
                                  "labels": [],
                                  "elemLabels": {}
                              }
                          ]
                      }
                  },
                  "message": [],
                  "values": [],
                  "labels": [],
                  "elemLabels": {}
              }
          ]
      }
  },
  "message": [],
  "values": [],
  "labels": [
      {
          "locale": "en-US",
          "text": "testing card details label"
      }
  ],
  "elemLabels": {}
};