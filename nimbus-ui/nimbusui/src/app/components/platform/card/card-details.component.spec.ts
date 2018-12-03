import { Param } from './../../../shared/param-state';
'use strict';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/primeng';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Component, Input, Output, ViewChild, EventEmitter, ViewChildren } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CardDetailsComponent } from './card-details.component';
import { Link } from '../link.component';
// import { CardDetailsFieldComponent } from './card-details-field.component';
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
// import { Button } from '../../platform/form/elements/button.component';
import { Image } from '../../platform/image.component';
import { SvgComponent } from '../../platform/svg/svg.component';
import { configureTestSuite } from 'ng-bullet';
import { setup, TestContext } from '../../../setup.spec';
import * as data from '../../../payload.json';
import { By } from '@angular/platform-browser';

let param, pageService;

class MockPageService {
    processEvent() {    }
}

@Component({
  template: '<div></div>',
  selector: 'nm-button'
})
class Button {

  @Input() element: any;
  @Input() payload: string;
  @Input() form: any;
  @Input() actionTray?: boolean;

  @Output() buttonClickEvent = new EventEmitter();

  @Output() elementChange = new EventEmitter();
  private imagesPath: string;
  private btnClass: string;
  private disabled: boolean;
  files: any;
  differ: any;
  componentTypes;
}

@Component({
    template: '<div></div>',
    selector: 'nm-card-details-field'
  })
  class CardDetailsFieldComponent {
  
    @Input() element: any;
    @Input() value: string;

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
  AngularSvgIconModule,
  BrowserAnimationsModule
];
const providers = [
  { provide: PageService, useClass: MockPageService },
  CustomHttpClient,
  LoaderService,
  ConfigService
];
let fixture, hostComponent;

const element1: any = {
    "config": {
        "active": false,
        "required": false,
        "id": "3443",
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
                "expandable": false,
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
                    "3445"
                ]
            }
        }
    },
    "enabled": true,
    "visible": true,
    "activeValidationGroups": [],
    "collectionParams": [],
    "configId": "3443",
    "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo",
    "type": {
        "model": {
            "params": [
                {
                    "config": {
                        "active": false,
                        "required": false,
                        "id": "3445",
                        "code": "vcdbOwner",
                        "validations": null,
                        "uiNatures": [],
                        "uiStyles": {
                          "isLink": false,
                          "isHidden": false,
                          "name": "ViewConfig.CardDetail.Body",
                          "attributes": {
                            "hidden": false,
                            "readOnly": false,
                            "submitButton": true,
                            "showName": true,
                            "pageSize": 25,
                            "browserBack": false,
                            "showAsLink": false,
                            "cssClass": "",
                            "alias": "CardDetailsBody"
                          }
                        },
                        "type": {
                          "collection": false,
                          "nested": true,
                          "name": "VPOwnerInfo.VCDBOwner",
                          "model": {
                              "params": [
                                {
                                    "alias": "FieldValue",
                                    "enabled": true,
                                    "visible": true,
                                    "activeValidationGroups": [],
                                    "collectionParams": [],
                                    "configId": "3447",
                                    "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo/vcdbOwner/firstName",
                                    "type": {
                                        "nested": false,
                                        "name": "string",
                                        "collection": false
                                    },
                                    "leafState": "test",
                                    "previousLeafState": "test",
                                    "message": [],
                                    "values": [],
                                    "labels": [
                                        {
                                            "locale": "en-US",
                                            "text": "First Name"
                                        }
                                    ],
                                    "elemLabels": {}
                                },
                                {
                                    "enabled": true,
                                    "visible": true,
                                    "activeValidationGroups": [],
                                    "collectionParams": [],
                                    "configId": "3448",
                                    "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo/vcdbOwner/lastName",
                                    "type": {
                                        "nested": false,
                                        "name": "string",
                                        "collection": false
                                    },
                                    "leafState": "1",
                                    "previousLeafState": "1",
                                    "message": [],
                                    "values": [],
                                    "labels": [
                                        {
                                            "locale": "en-US",
                                            "text": "Last Name"
                                        }
                                    ],
                                    "elemLabels": {}
                                },
                                {
                                    "enabled": true,
                                    "visible": true,
                                    "activeValidationGroups": [],
                                    "collectionParams": [],
                                    "configId": "3449",
                                    "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo/vcdbOwner/divider2",
                                    "type": {
                                        "nested": false,
                                        "name": "string",
                                        "collection": false
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
                                    "configId": "3450",
                                    "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo/vcdbOwner/address",
                                    "type": {
                                        "nested": false,
                                        "name": "string",
                                        "collection": false
                                    },
                                    "leafState": "",
                                    "previousLeafState": "",
                                    "message": [],
                                    "values": [],
                                    "labels": [
                                        {
                                            "locale": "en-US",
                                            "text": "Address"
                                        }
                                    ],
                                    "elemLabels": {}
                                },
                                {
                                    "enabled": true,
                                    "visible": true,
                                    "activeValidationGroups": [],
                                    "collectionParams": [],
                                    "configId": "3451",
                                    "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo/vcdbOwner/city",
                                    "type": {
                                        "nested": false,
                                        "name": "string",
                                        "collection": false
                                    },
                                    "leafState": "",
                                    "previousLeafState": "",
                                    "message": [],
                                    "values": [],
                                    "labels": [
                                        {
                                            "locale": "en-US",
                                            "text": "City"
                                        }
                                    ],
                                    "elemLabels": {}
                                },
                                {
                                    "enabled": true,
                                    "visible": true,
                                    "activeValidationGroups": [],
                                    "collectionParams": [],
                                    "configId": "3452",
                                    "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo/vcdbOwner/telephone",
                                    "type": {
                                        "nested": false,
                                        "name": "string",
                                        "collection": false
                                    },
                                    "leafState": "1231231231",
                                    "previousLeafState": "1231231231",
                                    "message": [],
                                    "values": [],
                                    "labels": [
                                        {
                                            "locale": "en-US",
                                            "text": "Telephone"
                                        }
                                    ],
                                    "elemLabels": {}
                                },
                                {
                                    "enabled": true,
                                    "visible": true,
                                    "activeValidationGroups": [],
                                    "collectionParams": [],
                                    "configId": "3453",
                                    "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo/vcdbOwner/caseStatusDate",
                                    "type": {},
                                    "leafState": "2018-09-04T20:47:18.000Z",
                                    "message": [],
                                    "values": [],
                                    "labels": [
                                        {
                                            "locale": "en-US",
                                            "text": "Case Status Date"
                                        }
                                    ],
                                    "elemLabels": {}
                                },
                                {
                                    "enabled": true,
                                    "visible": true,
                                    "activeValidationGroups": [],
                                    "collectionParams": [],
                                    "configId": "3454",
                                    "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo/vcdbOwner/caseStatusDate1",
                                    "type": {},
                                    "leafState": null,
                                    "message": [],
                                    "values": [],
                                    "labels": [
                                        {
                                            "locale": "en-US",
                                            "text": "Case Status Date"
                                        }
                                    ],
                                    "elemLabels": {}
                                }
                            ],
                            "paramConfigIds": [
                              "3447",
                              "3448",
                              "3449",
                              "3450",
                              "3451",
                              "3452",
                              "3453",
                              "3454"
                            ]
                          }
                        }
                      },                      
                    "enabled": true,
                    "visible": true,
                    "activeValidationGroups": [],
                    "collectionParams": [],
                    "configId": "3445",
                    "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo/vcdbOwner",
                    "type": {
                        "model": {
                            "params": [
                                {
                                    "config": {
                                        "active": false,
                                        "required": false,
                                        "id": "2478",
                                        "code": "test",
                                        "validations": null,
                                        "uiNatures": [],
                                        "uiStyles": {
                                            "isLink": false,
                                            "isHidden": false,
                                            "name": "ViewConfig.StaticText",
                                            "attributes": {
                                                "hidden": false,
                                                "readOnly": false,
                                                "submitButton": true,
                                                "showName": true,
                                                "pageSize": 25,
                                                "browserBack": false,
                                                "showAsLink": false,
                                                "cssClass": "",
                                                "contentId": "",
                                                "alias": "StaticText"
                                            }
                                        },
                                        "type": {
                                            "collection": false,
                                            "nested": false,
                                            "name": "string"
                                        }
                                    },
                                    "enabled": true,
                                    "visible": true,
                                    "activeValidationGroups": [],
                                    "collectionParams": [],
                                    "configId": "2478",
                                    "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo/vcdbOwner/test",
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
                                            "text": "testing static label"
                                        }
                                    ],
                                    "elemLabels": {}
                                },
                                {
                                    "config": {
                                        "active": false,
                                        "required": false,
                                        "id": "3447",
                                        "code": "firstName",
                                        "validations": null,
                                        "uiNatures": [],
                                        "uiStyles": {
                                            "isLink": false,
                                            "isHidden": false,
                                            "name": "ViewConfig.FieldValue",
                                            "attributes": {
                                                "hidden": false,
                                                "readOnly": false,
                                                "submitButton": true,
                                                "showName": true,
                                                "pageSize": 25,
                                                "browserBack": false,
                                                "showAsLink": false,
                                                "inplaceEditType": "",
                                                "cssClass": "",
                                                "datePattern": "",
                                                "alias": "FieldValue",
                                                "applyValueStyles": false,
                                                "placeholder": "",
                                                "inplaceEdit": true,
                                                "type": "Field",
                                                "cols": "2",
                                                "imgSrc": ""
                                            }
                                        },
                                        "type": {
                                            "collection": false,
                                            "nested": false,
                                            "name": "string"
                                        }
                                    },
                                    "alias": "FieldValue",
                                    "enabled": true,
                                    "visible": true,
                                    "activeValidationGroups": [],
                                    "collectionParams": [],
                                    "configId": "3447",
                                    "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo/vcdbOwner/firstName",
                                    "type": {
                                        "nested": false,
                                        "name": "string",
                                        "collection": false
                                    },
                                    "leafState": "test",
                                    "previousLeafState": "test",
                                    "message": [],
                                    "values": [],
                                    "labels": [
                                        {
                                            "locale": "en-US",
                                            "text": "First Name"
                                        }
                                    ],
                                    "elemLabels": {}
                                },
                                {
                                    "config": {
                                        "active": false,
                                        "required": false,
                                        "id": "3640",
                                        "code": "headerCallSection1",
                                        "validations": null,
                                        "uiNatures": [],
                                        "uiStyles": {
                                            "isLink": false,
                                            "isHidden": false,
                                            "name": "ViewConfig.Paragraph",
                                            "attributes": {
                                                "hidden": false,
                                                "readOnly": false,
                                                "submitButton": true,
                                                "showName": true,
                                                "pageSize": 25,
                                                "browserBack": false,
                                                "showAsLink": false,
                                                "cssClass": "font-weight-bold",
                                                "alias": "Paragraph"
                                            }
                                        },
                                        "type": {
                                            "collection": false,
                                            "nested": false,
                                            "name": "string"
                                        }
                                    },
                                    "enabled": true,
                                    "visible": true,
                                    "activeValidationGroups": [],
                                    "collectionParams": [],
                                    "configId": "3640",
                                    "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo/vcdbOwner/headerCallSection1",
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
                                            "text": "teting cardddetails paragraph..."
                                        }
                                    ],
                                    "elemLabels": {}
                                },
                                {
                                    "enabled": true,
                                    "visible": true,
                                    "activeValidationGroups": [],
                                    "collectionParams": [],
                                    "configId": "3448",
                                    "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo/vcdbOwner/lastName",
                                    "type": {
                                        "nested": false,
                                        "name": "string",
                                        "collection": false
                                    },
                                    "leafState": "1",
                                    "previousLeafState": "1",
                                    "message": [],
                                    "values": [],
                                    "labels": [
                                        {
                                            "locale": "en-US",
                                            "text": "Last Name"
                                        }
                                    ],
                                    "elemLabels": {}
                                },
                                {
                                    "enabled": true,
                                    "visible": true,
                                    "activeValidationGroups": [],
                                    "collectionParams": [],
                                    "configId": "3449",
                                    "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo/vcdbOwner/divider2",
                                    "type": {
                                        "nested": false,
                                        "name": "string",
                                        "collection": false
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
                                    "configId": "3450",
                                    "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo/vcdbOwner/address",
                                    "type": {
                                        "nested": false,
                                        "name": "string",
                                        "collection": false
                                    },
                                    "leafState": "",
                                    "previousLeafState": "",
                                    "message": [],
                                    "values": [],
                                    "labels": [
                                        {
                                            "locale": "en-US",
                                            "text": "Address"
                                        }
                                    ],
                                    "elemLabels": {}
                                },
                                {
                                    "enabled": true,
                                    "visible": true,
                                    "activeValidationGroups": [],
                                    "collectionParams": [],
                                    "configId": "3451",
                                    "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo/vcdbOwner/city",
                                    "type": {
                                        "nested": false,
                                        "name": "string",
                                        "collection": false
                                    },
                                    "leafState": "",
                                    "previousLeafState": "",
                                    "message": [],
                                    "values": [],
                                    "labels": [
                                        {
                                            "locale": "en-US",
                                            "text": "City"
                                        }
                                    ],
                                    "elemLabels": {}
                                },
                                {
                                    "enabled": true,
                                    "visible": true,
                                    "activeValidationGroups": [],
                                    "collectionParams": [],
                                    "configId": "3452",
                                    "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo/vcdbOwner/telephone",
                                    "type": {
                                        "nested": false,
                                        "name": "string",
                                        "collection": false
                                    },
                                    "leafState": "1231231231",
                                    "previousLeafState": "1231231231",
                                    "message": [],
                                    "values": [],
                                    "labels": [
                                        {
                                            "locale": "en-US",
                                            "text": "Telephone"
                                        }
                                    ],
                                    "elemLabels": {}
                                },
                                {
                                    "enabled": true,
                                    "visible": true,
                                    "activeValidationGroups": [],
                                    "collectionParams": [],
                                    "configId": "3453",
                                    "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo/vcdbOwner/caseStatusDate",
                                    "type": {},
                                    "leafState": "2018-09-04T20:47:18.000Z",
                                    "message": [],
                                    "values": [],
                                    "labels": [
                                        {
                                            "locale": "en-US",
                                            "text": "Case Status Date"
                                        }
                                    ],
                                    "elemLabels": {}
                                },
                                {
                                    "enabled": true,
                                    "visible": true,
                                    "activeValidationGroups": [],
                                    "collectionParams": [],
                                    "configId": "3454",
                                    "path": "/ownerview/vpOwnerInfo/vtOwnerInfo/vsOwnerInfo/vcdOwnerInfo/vcdbOwner/caseStatusDate1",
                                    "type": {},
                                    "leafState": null,
                                    "message": [],
                                    "values": [],
                                    "labels": [
                                        {
                                            "locale": "en-US",
                                            "text": "Case Status Date"
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
    "labels": [
        {
            "locale": "en-US",
            "text": "testing card details label"
        }
    ],
    "elemLabels": {}
};

describe('CardDetailsComponent', () => {

  configureTestSuite(() => {
    setup( declarations, imports, providers);
  });

     let payload = '{\"activeValidationGroups\":[], \"config\":{\"code\":\"firstName\",\"desc\":{\"help\":\"firstName\",\"hint\":\"firstName\",\"label\":\"firstName\"},\"validation\":{\"constraints\":[{\"name\":\"NotNull\",\"value\":null,\"attribute\":{\"groups\": []}}]},\"values\":[],\"uiNatures\":[],\"enabled\":true,\"visible\":true,\"uiStyles\":{\"isLink\":false,\"isHidden\":false,\"name\":\"ViewConfig.TextBox\",\"value\":null,\"attributes\":{\"hidden\":false,\"readOnly\":false,\"alias\":\"TextBox\",\"labelClass\":\"anthem-label\",\"type\":\"text\",\"postEventOnChange\":false,\"controlId\":\"\"}},\"postEvent\":false},\"type\":{\"nested\":true,\"name\":\"string\",\"collection\":false,\"model\": {"\params\":[{\"activeValidationGroups\":[], \"config\":{\"code\":\"nestedName\",\"desc\":{\"help\":\"nestedName\",\"hint\":\"nestedName\",\"label\":\"nestedName\"},\"validation\":{\"constraints\":[{\"name\":\"NotNull\",\"value\":null,\"attribute\":{\"groups\": []}}]},\"values\":[],\"uiNatures\":[],\"enabled\":true,\"visible\":true,\"uiStyles\":{\"isLink\":false,\"isHidden\":false,\"name\":\"ViewConfig.TextBox\",\"value\":null,\"attributes\":{\"hidden\":false,\"readOnly\":false,\"alias\":\"TextBox\",\"labelClass\":\"anthem-label\",\"type\":\"text\",\"postEventOnChange\":false,\"controlId\":\"\"}},\"postEvent\":false},\"type\":{\"nested\":false,\"name\":\"string\",\"collection\":false},\"leafState\":\"testData\",\"path\":\"/page/memberSearch/memberSearch/memberSearch/nestedName\"}]}},\"leafState\":\"testData\",\"path\":\"/page/memberSearch/memberSearch/memberSearch/firstName\"}';     let param: Param = JSON.parse(payload);

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailsComponent);
    hostComponent = fixture.debugElement.componentInstance;
    hostComponent.element = element1 as Param;    
    pageService = TestBed.get(PageService);
  });

  it('should create the CardDetailsComponent',async(() => {
      console.log('this.hostComponent.element--122--dup', hostComponent.element);
      
    expect(hostComponent).toBeTruthy();
  }));

  it('toggle() should updated opened property',async(() => {
    hostComponent.opened = true;
    hostComponent.toggle();
    expect(hostComponent.opened).toEqual(false);
  }));

  it('processOnClick() should call pageService.processEvent',async(() => {
    hostComponent.element.path = '/a';
    spyOn(pageService, 'processEvent').and.callThrough();
    hostComponent.processOnClick();
    expect(pageService.processEvent).toHaveBeenCalled();
  }));

  it('getAllURLParams should return null matching the regexp',async(() => {
    expect(hostComponent.getAllURLParams('/webhp?hl=en')).toEqual(null);
  }));

  it('getAllURLParams should return string matching the regexp',async(() => {
    expect(hostComponent.getAllURLParams('{ /webhp?hl=en}')).toEqual(['{ /webhp?hl=en}']);
  }));

  it('toggleState() should update isHidden and _state properties',async(() => {
    hostComponent.state = 'closedPanel';
    hostComponent.isHidden = true;
    hostComponent.toggleState();
    expect(hostComponent.isHidden).toBeFalsy();
    expect((hostComponent as any)._state).toEqual('openPanel');
  }));

  it('toggleState() should update _state property',async(() => {
    hostComponent.state = 'openPanel';
    hostComponent.toggleState();
    expect((hostComponent as any)._state).toEqual('closedPanel');
  }));

  it('animationDone() should update the isHidden property',async(() => {
    hostComponent.state = 'closedPanel';
    hostComponent.animationDone('a');
    expect(hostComponent.isHidden).toBeTruthy();
  }));

  it('Label should be created on providing the element.labelconfig and display the value provided', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    console.log('debugElement-169', debugElement);
    
  }));

  it('Label should not be created on if element.labelconfig is empty', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
  }));

  it('Carddetails header should be created if param.config?.uiStyles?.attributes?.alias === CardDetailsHeader', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
  }));

  it('Carddetails header should not be created if param.config?.uiStyles?.attributes?.alias !== CardDetailsHeader', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
  }));

  it('Expandable Button should be created created if element.config.uiStyles.attributes.alias === Carddetail and element.config.uiStyles.attributes.expandable === true', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
  }));

  it('Expandable Button should not be created created if element.config.uiStyles.attributes.alias === Carddetail and element.config.uiStyles.attributes.expandable === false', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
  }));

  it('OnClick of Expandable Button it should call toggle()', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
  }));

  it('Button group should be created if element.type.model.params[0].type.model.params[0].config?.uiStyles?.attributes?.alias === ButtonGroup', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
  }));

  it('Button group should not be created if element.type.model.params[0].type.model.params[0].config?.uiStyles?.attributes?.alias !== ButtonGroup', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
  }));

  it('Paragraph should be created if element.type.model.params[0].type.model.params[0].config?.uiStyles?.attributes?.alias === Paragraph', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const paragraphEle = debugElement.query(By.css('nm-paragraph'));
    expect(paragraphEle.name).toEqual('nm-paragraph');
  }));

  it('Paragraph should not be created if element.type.model.params[0].type.model.params[0].config?.uiStyles?.attributes?.alias !== Paragraph', async(() => {
    hostComponent.element.type.model.params[0].type.model.params[2].config.uiStyles.attributes.alias = '';
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const paragraphEle = debugElement.query(By.css('nm-paragraph'));
    expect(paragraphEle).toBeFalsy();
  }));

  it('card-details-field should be created if element.type.model.params[0].type.model.params[0].config?.uiStyles?.attributes?.alias === FieldValue', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
  }));

  it('card-details-field should not be created if element.type.model.params[0].type.model.params[0].config?.uiStyles?.attributes?.alias !== FieldValue', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
  }));

  it('StaticText in card details body should be created if element.type.model.params[0].type.model.params[0].config?.uiStyles?.attributes?.alias === StaticText', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const staticTextEle = debugElement.query(By.css('nm-static-text'));
    expect(staticTextEle.name).toEqual('nm-static-text');
  }));

  it('StaticText in card details body should not be created if element.type.model.params[0].type.model.params[0].config?.uiStyles?.attributes?.alias !== StaticText', async(() => {
    hostComponent.element.type.model.params[0].type.model.params[0].config.uiStyles.attributes.alias = '';
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const staticTextEle = debugElement.query(By.css('nm-static-text'));
    expect(staticTextEle).toBeFalsy();
  }));

  it('Paragraph in card details body should be created if element.type.model.params[0].type.model.params[0].config?.uiStyles?.attributes?.alias === Paragraph', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
  }));

  it('Paragraph in card details body should not be created if element.type.model.params[0].type.model.params[0].config?.uiStyles?.attributes?.alias !== Paragraph', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
  }));

  it('CardDetailsFieldGroup in card details body should be created if element.type.model.params[0].type.model.params[0].config?.uiStyles?.attributes?.alias === CardDetailsFieldGroup', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
  }));

  it('CardDetailsFieldGroup in card details body should not be created if element.type.model.params[0].type.model.params[0].config?.uiStyles?.attributes?.alias !== CardDetailsFieldGroup', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
  }));

  it('CardDetailsField in card details body should be created if element.type.model.params[0].type.model.params[0].config?.uiStyles?.attributes?.alias === CardDetailsField  ', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const CardDetailsFieldEle = debugElement.query(By.css('nm-card-details-field'));
    expect(CardDetailsFieldEle.name).toEqual('nm-card-details-field');
  }));

  it('CardDetailsField in card details body should not be created if element.type.model.params[0].type.model.params[0].config?.uiStyles?.attributes?.alias !== CardDetailsField', async(() => {
    hostComponent.element.type.model.params[0].type.model.params[1].config.uiStyles.attributes.alias = '';
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const CardDetailsFieldEle = debugElement.query(By.css('nm-card-details-field'));
    expect(CardDetailsFieldEle).toBeFalsy;
  }));

  it('Link should be created if element.type.model.params[0].type.model.params[0].config?.uiStyles?.isLink is valid', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
  }));

  it('Link should not be created if element.type.model.params[0].type.model.params[0].config?.uiStyles?.isLink is invalid', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
  }));


});

