 'use strict';
import { TestBed, async } from '@angular/core/testing';
import { DataTableModule, SharedModule, OverlayPanelModule, PickListModule, DragDropModule, CalendarModule, 
    FileUpload, FileUploadModule, ListboxModule, DialogModule, CheckboxModule, DropdownModule, RadioButtonModule, 
    ProgressBarModule, ProgressSpinnerModule, AccordionModule, GrowlModule, MessagesModule, InputSwitchModule, TreeTableModule  } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { KeyFilterModule } from 'primeng/keyfilter';
import { FormsModule, ReactiveFormsModule, ValidatorFn, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Table } from 'primeng/table';
import * as moment from 'moment';
import { ElementRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { DomHandler } from 'primeng/components/dom/domhandler';
import { ObjectUtils } from 'primeng/components/utils/objectutils';
import { TableService } from 'primeng/components/table/table';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {ToastModule} from 'primeng/toast';
import { StorageServiceModule, SESSION_STORAGE } from 'angular-webstorage-service';
import { fromEvent as observableFromEvent,  Subscription ,  Observable } from 'rxjs';
import { of as observableOf } from 'rxjs';
import { Component, Input, Output, ViewChild, EventEmitter, ViewChildren } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JL } from 'jsnlog';

import { DataTable } from './table.component';
// import { Section } from '../section.component';
import { ActionDropdown } from '../form/elements/action-dropdown.component';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { ComboBox } from '../../platform/form/elements/combobox.component';
import { InputText } from '../form/elements/textbox.component';
import { ButtonGroup } from '../form/elements/button-group.component';
import { Menu } from '../menu.component';
import { Link } from '../link.component';
import { Form } from '../form.component';
import { StaticText } from '../content/static-content.component';
import { Paragraph } from '../content/paragraph.component';
import { CardDetailsComponent } from '../card/card-details.component';
import { CardDetailsGrid } from '../card/card-details-grid.component';
// import { MessageComponent } from '../message/message.component';
import { ActionLink } from '../form/elements/action-dropdown.component';
import { SelectItemPipe } from '../../../pipes/select-item.pipe';
import { FrmGroupCmp } from '../form-group.component';
import { Accordion } from '../content/accordion.component';
import { CardDetailsFieldComponent } from '../card/card-details-field.component';
import { FormElement } from '../form-element.component';
import { DateTimeFormatPipe } from '../../../pipes/date.pipe';
import { InPlaceEditorComponent } from '../form/elements/inplace-editor.component';
import { TextArea } from '../form/elements/textarea.component';
import { FileUploadComponent } from '../fileupload/file-upload.component';
import { OrderablePickList } from '../form/elements/picklist.component';
import { MultiselectCard } from '../form/elements/multi-select-card.component';
import { MultiSelectListBox } from '../form/elements/multi-select-listbox.component';
import { CheckBox } from '../form/elements/checkbox.component';
import { CheckBoxGroup } from '../form/elements/checkbox-group.component';
import { RadioButton } from '../form/elements/radio.component';
import { Calendar } from '../form/elements/calendar.component';
import { Signature } from '../form/elements/signature.component';
import { Header } from '../content/header.component';
import { PageService } from '../../../services/page.service';
import { CustomHttpClient } from '../../../services/httpclient.service';
import { LoaderService } from '../../../services/loader.service';
import { ConfigService } from '../../../services/config.service';
import { LoggerService } from '../../../services/logger.service';
import { GridService } from '../../../services/grid.service';
import { Param, GridData } from '../../../shared/param-state';
import { Subject } from 'rxjs';
import { ParamConfig, ConfigType, UiStyle, UiAttribute } from '../../../shared/param-config';
import { ParamUtils } from '../../../shared/param-utils';
import { ViewComponent } from '../../../shared/param-annotations.enum';
import { HeaderCheckBox } from '../form/elements/header-checkbox.component';
import { SvgComponent } from '../svg/svg.component';
import { Image } from '../image.component';
import { DisplayValueDirective } from '../../../directives/display-value.directive';
import { InputSwitch } from '../../platform/form/elements/input-switch.component';
import { TreeGrid } from '../../platform/tree-grid/tree-grid.component';
import { Label } from '../../platform/content/label.component';
import { InputLabel } from '../../platform/form/elements/input-label.component';
import { CardDetailsFieldGroupComponent } from '../../platform/card/card-details-field-group.component';
import { FormGridFiller } from '../../platform/form/form-grid-filler.component';
import { SessionStoreService, CUSTOM_STORAGE } from '../../../services/session.store';
import { InputLegend } from '../../platform/form/elements/input-legend.component';
import { FormErrorMessage } from '../form-error-message.component';
import { configureTestSuite } from 'ng-bullet';
import { setup, TestContext } from '../../../setup.spec';
import * as data from '../../../payload.json';
import { WebContentSvc } from '../../../services/content-management.service';
import { PrintDirective } from '../../../directives/print.directive';
import { By } from '@angular/platform-browser';
import { ServiceConstants } from '../../../services/service.constants';
import { WindowRefService } from '../../../services/window-ref.service';
import { AppInitService } from '../../../services/app.init.service';
import { PrintService } from '../../../services/print.service';
import { tableParams, tableElement } from 'mockdata';

let configService, pageService, elementRef, objectUtils, domHandler, tableService, cd, param, webContentSvc;

@Component({
    selector: 'nm-section',
    template: '<div></div>'
})
export class Section {
    @Input() position: any;
    @Input() element: any;

    viewComponent: any;
    componentTypes: any;
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
    selector: 'nm-message',
    template: `
<div></div>
    `
})

export class MessageComponent {
    @Input() messageContext: String;
    @Input() messageArray: any[];
    @Input() life: number;
    @Input() styleClass: String;
    componentTypes: any;
}

class MockPageService {
    gridValueUpdate$: Subject<any>;
    validationUpdate$: Subject<any>;
    eventUpdate$: Subject<any>;

    constructor() {
        this.gridValueUpdate$ = new Subject();
        this.validationUpdate$ = new Subject();
        this.eventUpdate$ = new Subject();

    }
    postOnChange(a, b, c) { }
    processEvent(a, s, d, f, g) { }
    logError(a) {
        this.gridValueUpdate$.next(a);
    }
    notifyErrorEvent(a) {
        this.validationUpdate$.next(a);
    }
}

class MockElementRef {
    nativeElement = {
        querySelector: () => {
            return {
                scrollIntoView: () => {}};
        }
    };
}

class MockChangeDetectorRef {
  markForCheck() { 
    console.log('markForCheck....');
    
   }
}

const declarations = [
  DataTable,
  Section,
  ActionDropdown,
  TooltipComponent,
  ComboBox,
  InputText,
  ButtonGroup,
  Button,
  Menu,
  Link,
  Form,
  StaticText,
  Paragraph,
  CardDetailsComponent,
  CardDetailsGrid,
  MessageComponent,
  ActionLink,
  SelectItemPipe,
  FrmGroupCmp,
  Accordion,
  CardDetailsFieldComponent,
  FormElement,
  DateTimeFormatPipe,
  InPlaceEditorComponent,
  TextArea,
  FileUploadComponent,
  OrderablePickList,
  MultiselectCard,
  MultiSelectListBox,
  CheckBox,
  CheckBoxGroup,
  RadioButton,
  Calendar,
  Signature,
  Header,
  HeaderCheckBox,
  SvgComponent,
  Image,
  DisplayValueDirective,
  InputSwitch,
  TreeGrid,
  Label,
  InputLabel,
  CardDetailsFieldGroupComponent,
  FormGridFiller,
  InputLegend,
  FormErrorMessage,
  PrintDirective
];
const imports = [
   DialogModule,
   FormsModule,
   DropdownModule,
   DataTableModule,
   AccordionModule,
   ReactiveFormsModule,
   GrowlModule,
   MessagesModule,
   FileUploadModule,
   PickListModule,
   ListboxModule,
   CheckboxModule,
   RadioButtonModule,
   CalendarModule,
   TableModule,
   KeyFilterModule,
   HttpModule,
   HttpClientTestingModule,
   AngularSvgIconModule,
   ToastModule,
   InputSwitchModule,
   TreeTableModule,
   StorageServiceModule,
   BrowserAnimationsModule
];
const providers = [
   {provide: PageService, useClass: MockPageService},
   {provide: ElementRef, useClass: MockElementRef},
   { provide: CUSTOM_STORAGE, useExisting: SESSION_STORAGE },
   { provide: 'JSNLOG', useValue: JL },
   CustomHttpClient,
   LoaderService,
   ConfigService,
   LoggerService,
   GridService,
   ObjectUtils,
   DomHandler,
   TableService,
   SessionStoreService,
   WebContentSvc,
   ChangeDetectorRef,
   WindowRefService,
   AppInitService,
   PrintService
];
let fixture, hostComponent;
describe('DataTable', () => {

    configureTestSuite(() => {
        setup(declarations, imports, providers);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DataTable);
        hostComponent = fixture.debugElement.componentInstance;
        hostComponent.element = tableElement as Param;
        hostComponent.params = tableParams as ParamConfig[];
        hostComponent.form = new FormGroup({
            visitBulkAction: new FormControl(),
            firstName: new FormControl()
        });
        configService = TestBed.get(ConfigService);
        pageService = TestBed.get(PageService);
        elementRef = TestBed.get(ElementRef);
        objectUtils = TestBed.get(ObjectUtils);
        domHandler = TestBed.get(DomHandler);
        tableService = TestBed.get(TableService);
        cd = TestBed.get(ChangeDetectorRef);
        webContentSvc = TestBed.get(WebContentSvc);
    });


    it('should create the DataTable', () => {
        expect(hostComponent).toBeTruthy();
    });

    it('hostComponent._value should update the hostComponent.value', () => {
        hostComponent._value = ['test'];
        expect(hostComponent.value).toEqual(['test']);
    });

    it('hostComponent.value should update the hostComponent.value', () => {
        hostComponent.value = ['test'];
        expect(hostComponent.value).toEqual(['test']);
    });

    it('writeValue() should call cd.markForCheck()', () => {
        const spy = spyOn((hostComponent as any).cd, 'markForCheck').and.callThrough();
        hostComponent.writeValue({});
        expect(spy).toHaveBeenCalled();
    });

    it('should create the DataTable', () => {
        const spy = spyOn((hostComponent as any).cd, 'markForCheck').and.callThrough();
        hostComponent.writeValue(undefined);
        expect(spy).toHaveBeenCalled();
    });

    it('registerOnChange() should update the onChange property', () => {
        const test = () => { };
        hostComponent.registerOnChange(test);
        expect(hostComponent.onChange).toEqual(test);
    });

    it('registerOnTouched() should update the onTouched property', () => {
        const test = () => { };
        hostComponent.registerOnTouched(test);
        expect(hostComponent.onTouched).toEqual(test);
    });

    it('header Div is created if showHeader attribute is configured as true  ', async(() => {
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const headerDivEle = debugElement.query(By.css('.ui-datatable-header.ui-widget-header'));
        const pHeaderEle = debugElement.query(By.css('p-header'));
        expect(pHeaderEle).toBeTruthy();
        expect(headerDivEle).toBeTruthy();
    }));

    it('Nm-tooltip should be created if the help text is provided', async(() => {
        ServiceConstants.LOCALE_LANGUAGE = 'en-US';
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const tooltipEle = debugElement.query(By.css('nm-tooltip'));
        expect(tooltipEle).toBeTruthy();
    }));

    it('Nm-tooltip should not be created if the help text is not provided', async(() => {
        hostComponent.element.labels[0].helpText = '';
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const tooltipEle = debugElement.query(By.css('nm-tooltip'));
        expect(tooltipEle).toBeFalsy();
    }));

    it('Clear Grid Filters button should be created if clearAllFilters configured as true', async(() => {
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const allBtnEles = debugElement.queryAll(By.css('.btn-plain.ml-2'));
        expect(allBtnEles.length).toEqual(3);
        expect(allBtnEles[0].nativeElement.innerText.toString()).toEqual('Clear Grid Filters');
    }));

    it('Clear Grid Filters button should not be created if clearAllFilters configured as false', async(() => {
        hostComponent.element.config.uiStyles.attributes.clearAllFilters = false;
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const allBtnEles = debugElement.queryAll(By.css('.btn-plain.ml-2'));
        expect(allBtnEles.length).toEqual(2);
        expect(allBtnEles[0].nativeElement.innerText.toString()).not.toEqual('Clear Grid Filters');
    }));

    it('Export button should be created if export configured as true', async(() => {
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const allBtnEles = debugElement.queryAll(By.css('.btn-plain.ml-2'));
        expect(allBtnEles.length).toEqual(2);
        expect(allBtnEles[0].nativeElement.innerText.toString()).toEqual('Export');
    }));

    it('Export button should not be created if export configured as false', async(() => {
        hostComponent.element.config.uiStyles.attributes.export = false;
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const allBtnEles = debugElement.queryAll(By.css('.btn-plain.ml-2'));
        expect(allBtnEles.length).toEqual(1);
    }));

    it('nm-header-checkbox should be created if rowSelection attribute is configured as true', async(() => {
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const nmHeaderChbxEle = debugElement.query(By.css('nm-header-checkbox'));
        expect(nmHeaderChbxEle).toBeTruthy();
    }));

    it('nm-header-checkbox should not be created if rowSelection attribute is configured as false', async(() => {
        hostComponent.element.config.uiStyles.attributes.rowSelection = false;
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const nmHeaderChbxEle = debugElement.query(By.css('nm-header-checkbox'));
        expect(nmHeaderChbxEle).toBeFalsy();
    }));

    it('filter icon should be created if the filter attribute is configured as true', async(() => {
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const filterIconEle = debugElement.queryAll(By.css('.fa.fa-fw.fa-filter.hidden-md-down'));
        expect(filterIconEle).toBeTruthy();
    }));

    it('th should be created if the expandableRows attribute is configured as true', async(() => {
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const thEle = debugElement.query(By.css('th'));
        expect(thEle).toBeTruthy();
    }));

    // pending
    it('span should be created if the filter attribute is configured as true', async(() => {
        hostComponent.toggleFilter();
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const divEle = document.getElementsByClassName('filterHolder');
        expect(divEle[0].parentElement.nodeName).toEqual('SPAN');
    }));

    it('span should not be created if the filter attribute is configured as false', async(() => {
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        //expect div is undefined
    }));

    it('if the filed type is date then p-calendar should be created and input should not be created', async(() => {
        hostComponent.toggleFilter();
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const pCalendarEle = debugElement.query(By.css('p-calendar'));
        expect(pCalendarEle).toBeTruthy();
    }));

    it('if the filed type is not date then p-calendar should not be created and input should be created', async(() => {
        spyOn(ParamUtils, 'isKnownDateType').and.returnValue(false);
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const pCalendarEle = debugElement.query(By.css('p-calendar'));
        expect(pCalendarEle).toBeFalsy();
    }));

    it('p-tableCheckbox should be created if rowSelection attribute is configured as true', async(() => {
        hostComponent.element.config.uiStyles.attributes.rowSelection = true;
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const pTableCheckboxEle = debugElement.query(By.css('p-tableCheckbox'));
        expect(pTableCheckboxEle).toBeTruthy();
    }));

    it('row expander icon should be created if expandableRows attribute is configured as true', async(() => {
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const expenderIconEle = debugElement.query(By.css('.fa.fa-fw.fa-chevron-circle-right.ui-row-toggler'));
        expect(expenderIconEle).toBeTruthy();
    }));

    it('row expander icon should not be created if expandableRows attribute is configured as false', async(() => {
        hostComponent.element.config.uiStyles.attributes.expandableRows = false;
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const expenderIconEle = debugElement.query(By.css('.fa.fa-fw.fa-chevron-circle-right.ui-row-toggler'));
        expect(expenderIconEle).toBeFalsy();
    }));

    it('td in body should be created if hidden attribute is configured as false and it is not a gridrowbody', async(() => {
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const tdEle = debugElement.query(By.css('.dropdown'));
        expect(tdEle).toBeTruthy();
    }));

    it('nm-link should be created if the link is configured', async(() => {
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const linkEle = debugElement.queryAll(By.css('nm-link'));
        expect(linkEle.length).toEqual(6);
    }));

    it('nm-link should be created if it is configure as gridcolumn and showAsLink attribute as true', async(() => {
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const linkEle = debugElement.queryAll(By.css('nm-link'));
        expect(linkEle.length).toEqual(6);
    }));

    it('nm-link should not be created if it is configure as gridcolumn and showAsLink attribute as false', async(() => {
        let debugElement;
        fixture.detectChanges();
        debugElement = fixture.debugElement;
        const previouslinkEle = debugElement.queryAll(By.css('nm-link'));
        hostComponent.params[5].uiStyles.attributes.showAsLink = false;
        fixture.detectChanges();
        debugElement = fixture.debugElement;
        const linkEle = debugElement.queryAll(By.css('nm-link'));
        expect(linkEle.length < previouslinkEle.length).toBeTruthy()
    }));

    it('nm-button should be created if the button is configured', async(() => {
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const btnEle = debugElement.query(By.css('nm-button'));
        expect(btnEle).toBeTruthy();
    }));

    it('nm-button should not be created if the button is not configured', async(() => {
        fixture.detectChanges();
        let debugElement = fixture.debugElement;
        const previousBtnEle = debugElement.queryAll(By.css('nm-button'));
        hostComponent.params[6].uiStyles.attributes.alias = '';
        fixture.detectChanges();
        debugElement = fixture.debugElement;
        const btnEle = debugElement.queryAll(By.css('nm-button'));
        expect(btnEle.length < previousBtnEle.length).toBeTruthy();
    }));

    it('nm-action-dropdown should be created if linkMenu is configured', async(() => {
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const actionDropdownEle = debugElement.query(By.css('nm-action-dropdown'));
        expect(actionDropdownEle).toBeTruthy();
    }));

    it('nm-action-dropdown should not be created if linkMenu is not configured', async(() => {
        fixture.detectChanges();
        let debugElement = fixture.debugElement;
        const previousActionDropdownEle = debugElement.queryAll(By.css('nm-action-dropdown'));
        hostComponent.params[8].uiStyles.attributes.alias = '';
        fixture.detectChanges();
        debugElement = fixture.debugElement;
        const actionDropdownEle = debugElement.queryAll(By.css('nm-action-dropdown'));
        expect(previousActionDropdownEle.length > actionDropdownEle.length).toBeTruthy();
    }));

    it('nm-section should be created if nested row data is available',async(() => {
        hostComponent.element.config.uiStyles.attributes.expandableRows = true;
        hostComponent.element.gridData.leafState[0]['nestedElement'] = true;
    fixture.detectChanges();
    let debugElement = fixture.debugElement;
    const iEle = debugElement.query(By.css('.fa.fa-fw.fa-chevron-circle-right.ui-row-toggler'));
    
    iEle.parent.nativeElement.click()
    fixture.detectChanges();
    const iEle1 = debugElement.query(By.css('.fa.fa-fw.fa-chevron-circle-down.ui-row-toggler'));
    console.log('iEle1--544', iEle1);
    
    // fixture.detectChanges();
    // debugElement = fixture.debugElement;
    const sectionEle = debugElement.query(By.css('nm-section'));
    const sectionEle1 = document.getElementsByTagName('nm-section');
    const sectionEle2 = document.getElementsByClassName('section-136');
    console.log('sectionEle---540', sectionEle, iEle);
    console.log('sectionEle---541', sectionEle1);
    console.log('sectionEle---542', sectionEle2);
    
    
    expect(sectionEle).toBeTruthy();
    }));

    // it('nm-section should not be created if nested row data is not available',async(() => {
    // fixture.detectChanges();
    // const debugElement = fixture.debugElement;  
    // }));

    // it('td with no records is found string should be created if data is not available',async(() => {
    //   fixture.detectChanges();
    //   const debugElement = fixture.debugElement;  
    // }));

    // it('td with no records is found string should not be created if data is available',async(() => {
    //   fixture.detectChanges();
    //   const debugElement = fixture.debugElement;  
    // }));

    it('post button should be created is postButton attribute is configured as true', async(() => {
        hostComponent.element.config.uiStyles.attributes.postButton = true;
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const postBtnEle = debugElement.query(By.css('.btn.btn-secondary.post-btn'));
        expect(postBtnEle).toBeTruthy();
    }));

    it('post button should not be created is postButton attribute is configured as false', async(() => {
        hostComponent.element.config.uiStyles.attributes.postButton = false;
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const postBtnEle = debugElement.query(By.css('.btn.btn-secondary.post-btn'));
        expect(postBtnEle).toBeFalsy();
    }));

    it('On click of the filter icon the tr with filters should be created', async(() => {
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const filterIconEle = debugElement.query(By.css('.fa.fa-fw.fa-filter.hidden-md-down'));
        spyOn(hostComponent, 'toggleFilter').and.callThrough();
        filterIconEle.nativeElement.click();
        expect(hostComponent.toggleFilter).toHaveBeenCalled();
    }));

    it('header Div should not be created if showHeader attribute is configured as false', async(() => {
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        hostComponent.element.config.uiStyles.attributes.showHeader = false;
        fixture.detectChanges();
        const headerDivEle = debugElement.query(By.css('.ui-datatable-header.ui-widget-header'));
        const pHeaderEle = debugElement.query(By.css('p-header'));
        expect(pHeaderEle).toBeFalsy();
        expect(headerDivEle).toBeFalsy();
    }));

    it('filter icon should not be created if the filter attribute is configured as false', async(() => {
        hostComponent.params[0].uiStyles.attributes.filter = false;
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const filterIconEle = debugElement.query(By.css('.fa.fa-fw.fa-filter.hidden-md-down'));
        expect(filterIconEle).toBeFalsy();
    }));

    it('th should not be created if the expandableRows attribute is configured as false', async(() => {
        hostComponent.element.config.uiStyles.attributes.expandableRows = true;
        fixture.detectChanges();
        let debugElement = fixture.debugElement;
        const previousThEle = debugElement.queryAll(By.css('th'));
        hostComponent.element.config.uiStyles.attributes.expandableRows = false;
        fixture.detectChanges();
        debugElement = fixture.debugElement;
        const thEle = debugElement.queryAll(By.css('th'));
        expect(thEle.length < previousThEle.length).toBeTruthy();
    }));

    it('p-tableCheckbox should not be created if rowSelection attribute is configured as false', async(() => {
        hostComponent.element.config.uiStyles.attributes.rowSelection = false;
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const pTableCheckboxEle = debugElement.query(By.css('p-tableCheckbox'));
        expect(pTableCheckboxEle).toBeFalsy();
    }));

    it('td in body should not be created if hidden attribute is configured as true or it is a gridrowbody', async(() => {
        for (let i = 0; i < hostComponent.params.length; i++) {
            hostComponent.params[i].uiStyles.attributes.hidden = true;
        }
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const tdEle = debugElement.query(By.css('.dropdown'));
        const tdEle1 = debugElement.query(By.css('.imageColumn'));
        expect(tdEle).toBeFalsy();
        expect(tdEle1).toBeFalsy();
    }));

    it('nm-link should not be created if the link is not configured', async(() => {
        for (let i = 0; i < hostComponent.params.length; i++) {
            if (hostComponent.params[i].uiStyles.attributes.alias == 'Link') {
                hostComponent.params[i].uiStyles.attributes.alias = '';
            }
        }
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const linkEle = debugElement.queryAll(By.css('nm-link'));
        expect(linkEle.length).toEqual(0);
    }));

    it('ngOnInit() should update the hasFilters, and rowExpanderKey properties', () => {
        for (let i = 0; i < hostComponent.params.length; i++) {
            hostComponent.params[i].uiStyles.attributes.filter = false;
        }
        const eleConfig = { code: '', uiStyles: { attributes: { rowSelection: true } } };
        spyOn(configService, 'getViewConfigById').and.returnValue(eleConfig);
        hostComponent.rowExpanderKey = 'test';
        spyOn(hostComponent, 'between').and.returnValue('test');
        hostComponent.ngOnInit();
        expect(hostComponent.hasFilters).toBeFalsy();
        expect(hostComponent.rowExpanderKey).toEqual('test');
    });

    it('ngAfterViewInit() should call pageService.processEvent()', () => {
        fixture.whenStable().then(() => {
            const eleConfig = { code: '', uiStyles: { attributes: { onLoad: true } } };
            hostComponent.element.config.uiStyles.attributes.lazyLoad = false;
            spyOn(configService, 'getViewConfigById').and.returnValue(eleConfig);
            spyOn(pageService, 'processEvent').and.callThrough();
            hostComponent.ngAfterViewInit();
            expect(pageService.processEvent).toHaveBeenCalled();
        });
    });

    it('ngAfterViewInit() should not call pageService.processEvent() if lazyLoad is true', () => {
        fixture.whenStable().then(() => {
            hostComponent.element.config.uiStyles.attributes.lazyLoad = true;
            spyOn(pageService, 'processEvent').and.callThrough();
            hostComponent.ngAfterViewInit();
            expect(pageService.processEvent).not.toHaveBeenCalled();
        });
    });

    it('ngAfterViewInit() should not call pageService.processEvent() if onLoad is false', () => {
        fixture.whenStable().then(() => {
            hostComponent.element.config.uiStyles.attributes.onLoad = false;
            spyOn(pageService, 'processEvent').and.callThrough();
            hostComponent.ngAfterViewInit();
            expect(pageService.processEvent).not.toHaveBeenCalled();
        });
    });

    it('ngAfterViewInit() should call dt.filter()', () => {
        hostComponent.element = new Param(configService);
        const eleConfig = { code: '', uiStyles: { attributes: { onLoad: true } } };
        hostComponent.params = [new ParamConfig(configService)];
        hostComponent.params[0].code = '';
        hostComponent.params[0].uiStyles = new UiStyle();
        hostComponent.params[0].uiStyles.attributes = new UiAttribute();
        hostComponent.params[0].uiStyles.attributes.filterValue = 'a';
        hostComponent.params[0].uiStyles.attributes.filterMode = '';
        spyOn(configService, 'getViewConfigById').and.returnValue(eleConfig);
        spyOn(hostComponent.dt, 'filter').and.returnValue('');
        hostComponent.ngAfterViewInit();
        expect(hostComponent.dt.filter).toHaveBeenCalled();
    });

    it('ngAfterViewInit() should not call dt.filter()', () => {
        const eleConfig = { code: '', uiStyles: { attributes: { onLoad: true } } };
        hostComponent.params = [new ParamConfig(configService)];
        hostComponent.params[0].code = '';
        hostComponent.params[0].uiStyles = new UiStyle();
        hostComponent.params[0].uiStyles.attributes = new UiAttribute();
        hostComponent.params[0].uiStyles.attributes.filterValue = '';
        hostComponent.params[0].uiStyles.attributes.filterMode = '';
        spyOn(configService, 'getViewConfigById').and.returnValue(eleConfig);
        spyOn(hostComponent.dt, 'filter').and.returnValue('');
        hostComponent.ngAfterViewInit();
        expect(hostComponent.dt.filter).not.toHaveBeenCalled();
    });

    it('ngAfterViewInit() should update the value, totalRecords properties and call updatePageDetailsState()', () => {
        fixture.whenStable().then(() => {
            const eleConfig = { code: '', uiStyles: { attributes: { onLoad: true, lazyLoad: true } } };
            hostComponent.element.path = 'test';
            const eve = { gridData: { leafState: [] }, path: 'test', gridList: [], page: { totalElements: 100, first: true } };
            spyOn(configService, 'getViewConfigById').and.returnValue(eleConfig);
            spyOn(hostComponent, 'updatePageDetailsState').and.callThrough();
            hostComponent.element.config.uiStyles.attributes.lazyLoad = true;
            hostComponent.ngAfterViewInit();
            pageService.logError(eve);
            expect(hostComponent.value).toEqual([]);
            expect(hostComponent.totalRecords).toEqual(100);
            expect(hostComponent.updatePageDetailsState).toHaveBeenCalled();
        });
    });

    it('ngAfterViewInit() should not call updatePageDetailsState()', () => {
        const eleConfig = { code: '', uiStyles: { attributes: { onLoad: true, lazyLoad: true } } };
        hostComponent.element.path = 'test';
        const eve = { path: '1test', gridList: 'tGrid', page: { totalElements: 'telements', first: true } };
        spyOn(configService, 'getViewConfigById').and.returnValue(eleConfig);
        spyOn(hostComponent, 'updatePageDetailsState').and.callThrough();
        hostComponent.ngAfterViewInit();
        pageService.logError(eve);
        expect(hostComponent.updatePageDetailsState).not.toHaveBeenCalled();
    });

    it('ngAfterViewInit() should call updatePageDetailsState() and update the dt.first', () => {
        const eleConfig = { code: '', uiStyles: { attributes: { onLoad: true, lazyLoad: false } } };
        hostComponent.element.path = 'test';
        const eve = { gridData: { leafState: '' }, path: 'test', gridList: 'tGrid', page: { totalElements: 'telements', first: true } };
        spyOn(configService, 'getViewConfigById').and.returnValue(eleConfig);
        spyOn(hostComponent, 'updatePageDetailsState').and.callThrough();
        hostComponent.ngAfterViewInit();
        pageService.logError(eve);
        expect(hostComponent.updatePageDetailsState).toHaveBeenCalled();
        expect(hostComponent.dt.first).toEqual(0);
    });

    it('ngAfterViewInit() should not call updatePageDetailsState() based on eve.page.first', () => {
        hostComponent.element = new Param(configService);
        const eleConfig = { code: '', uiStyles: { attributes: { onLoad: true, lazyLoad: true } } };
        hostComponent.element.path = 'test';
        const eve = { gridData: { leafState: '' }, path: 'test', gridList: 'tGrid', page: { totalElements: 'telements', first: false } };
        spyOn(configService, 'getViewConfigById').and.returnValue(eleConfig);
        spyOn(hostComponent, 'updatePageDetailsState').and.callThrough();
        hostComponent.ngAfterViewInit();
        pageService.logError(eve);
        expect(hostComponent.updatePageDetailsState).not.toHaveBeenCalled();
    });

    it('ngAfterViewInit() should call form.controls.t.enable()', () => {
        fixture.whenStable().then(() => {
            const eleConfig = { code: 't', uiStyles: { attributes: { onLoad: false } } };
            hostComponent.element.path = '/test';
            const eve = { enabled: true, path: '/test', config: { code: 'firstName' } };
            spyOn(configService, 'getViewConfigById').and.returnValue(eleConfig);
            spyOn(hostComponent.form.controls.firstName, 'enable').and.callThrough();
            hostComponent.ngAfterViewInit();
            pageService.notifyErrorEvent(eve);
            expect(hostComponent.form.controls.firstName.enable).toHaveBeenCalled();
        });
    });

    it('ngAfterViewInit() should call form.controls.t.disable()', () => {
        fixture.whenStable().then(() => {
            const eleConfig = { code: 't', uiStyles: { attributes: { onLoad: false } } };
            hostComponent.element.path = '/test';
            const eve = { enabled: false, path: '/test', config: { code: 'firstName' } };
            spyOn(configService, 'getViewConfigById').and.returnValue(eleConfig);
            spyOn(hostComponent.form.controls.firstName, 'disable').and.callThrough();
            hostComponent.ngAfterViewInit();
            pageService.notifyErrorEvent(eve);
            expect(hostComponent.form.controls.firstName.disable).toHaveBeenCalled();
        });
    });

    it('ngAfterViewInit() should not call form.controls.t.disable()', () => {
        fixture.whenStable().then(() => {
            const eleConfig = { code: 't', uiStyles: { attributes: { onLoad: false } } };
            hostComponent.element.path = '/test';
            const eve = { enabled: false, path: '/1test', config: { code: 'firstName' } };
            spyOn(configService, 'getViewConfigById').and.returnValue(eleConfig);
            spyOn(hostComponent.form.controls.firstName, 'disable').and.callThrough();
            hostComponent.ngAfterViewInit();
            pageService.notifyErrorEvent(eve);
            expect(hostComponent.form.controls.firstName.disable).not.toHaveBeenCalled();
        });
    });

    it('isRowExpanderHidden() should return true', () => {
        hostComponent.rowExpanderKey = '';
        expect(hostComponent.isRowExpanderHidden('')).toBeTruthy();
    });

    it('isRowExpanderHidden() should return true based on argument', () => {
        hostComponent.rowExpanderKey = 't';
        const testdata = { t: true };
        expect(hostComponent.isRowExpanderHidden(testdata)).toBeTruthy();
    });

    it('isRowExpanderHidden() should return false', () => {
        hostComponent.rowExpanderKey = 't';
        const testdata = { t: false };
        expect(hostComponent.isRowExpanderHidden(testdata)).toBeFalsy();
    });

    it('getCellDisplayValue() should call dtFormat.transform()', () => {
        const col = new ParamConfig(configService);
        col.code = 't';
        col.type = new ConfigType(configService);
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.datePattern = 'Date';
        const rowData = { t: true };
        spyOn(ParamUtils, 'isKnownDateType').and.returnValue(true);
        const spy = spyOn((hostComponent as any).dtFormat, 'transform').and.returnValue('test');
        hostComponent.getCellDisplayValue(rowData, col);
        expect(spy).toHaveBeenCalled();
    });

    it('getCellDisplayValue() should not call dtFormat.transform() and return true', () => {
        const col = new ParamConfig(configService);
        col.code = 't';
        col.type = new ConfigType(configService);
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.datePattern = 'Date';
        const rowData = { t: true };
        spyOn(ParamUtils, 'isKnownDateType').and.returnValue(false);
        const spy = spyOn((hostComponent as any).dtFormat, 'transform').and.returnValue('test');
        const res = hostComponent.getCellDisplayValue(rowData, col);
        expect(spy).not.toHaveBeenCalled();
        expect(res).toBeTruthy();
    });


    it('getCellDisplayValue() should not call dtFormat.transform() and return col.uiStyles.attributes.placeholder', () => {
        const col = new ParamConfig(configService);
        col.code = 't';
        col.type = new ConfigType(configService);
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.datePattern = 'Date';
        col.uiStyles.attributes.placeholder = 'test';
        const rowData = { t: null };
        spyOn(ParamUtils, 'isKnownDateType').and.returnValue(false);
        const spy = spyOn((hostComponent as any).dtFormat, 'transform').and.returnValue('test');
        const res = hostComponent.getCellDisplayValue(rowData, col);
        expect(spy).not.toHaveBeenCalled();
        expect(res).toEqual('test');
    });

    it('showColumn() should return true', () => {
        const col = new ParamConfig(configService);
        col.type = new ConfigType(configService);
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.hidden = false;
        col.uiStyles.attributes.alias = 'test';
        expect(hostComponent.showColumn(col)).toBeTruthy();
    });

    it('showColumn() should return true for link', () => {
        const col = new ParamConfig(configService);
        col.type = new ConfigType(configService);
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.hidden = false;
        col.uiStyles.attributes.alias = 'Link';
        expect(hostComponent.showColumn(col)).toBeTruthy();
    });

    it('showColumn() should return true for button', () => {
        const col = new ParamConfig(configService);
        col.type = new ConfigType(configService);
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.hidden = false;
        col.uiStyles.attributes.alias = 'Button';
        expect(hostComponent.showColumn(col)).toBeTruthy();
    });

    it('showColumn() should return true for LinkMenu', () => {
        const col = new ParamConfig(configService);
        col.type = new ConfigType(configService);
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.hidden = false;
        col.uiStyles.attributes.alias = 'LinkMenu';
        expect(hostComponent.showColumn(col)).toBeTruthy();
    });

    it('showColumn() should return false for gridRowBody', () => {
        const col = new ParamConfig(configService);
        col.type = new ConfigType(configService);
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.hidden = false;
        col.uiStyles.attributes.alias = 'GridRowBody';
        expect(hostComponent.showColumn(col)).toBeFalsy();
    });

    it('showColumn() should return false', () => {
        const col = new ParamConfig(configService);
        col.type = new ConfigType(configService);
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.hidden = true;
        col.uiStyles.attributes.alias = 'test';
        expect(hostComponent.showColumn(col)).toBeFalsy();
    });

    it('showHeader() should return true', () => {
        const col = new ParamConfig(configService);
        col.type = new ConfigType(configService);
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.hidden = false;
        col.uiStyles.attributes.alias = 'GridColumn';
        expect(hostComponent.showHeader(col)).toBeTruthy();
    });

    it('showHeader() should return false', () => {
        const col = new ParamConfig(configService);
        col.type = new ConfigType(configService);
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.hidden = false;
        col.uiStyles.attributes.alias = 'Button';
        expect(hostComponent.showHeader(col)).toBeFalsy();
    });

    it('showValue(col) should return true', () => {
        const col = new ParamConfig(configService);
        col.type = new ConfigType(configService);
        col.type.nested = false;
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.alias = 'test';
        expect(hostComponent.showValue(col)).toBeFalsy();
    });

    it('showValue(col) should return false if no uiStyle is given', () => {
        const col = new ParamConfig(configService);
        col.type = new ConfigType(configService);
        col.type.nested = false;
        col.uiStyles = new UiStyle();
        expect(hostComponent.showValue(col)).toBeFalsy();
    });

    it('showValue(col) should return true for GridColumn', () => {
        const col = new ParamConfig(configService);
        col.type = new ConfigType(configService);
        col.type.nested = false;
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.alias = ViewComponent.gridcolumn.toString();
        expect(hostComponent.showValue(col)).toBeTruthy();
    });

    it('showValue(col) should return false for GridColumn with showAsLink attribute', () => {
        const col = new ParamConfig(configService);
        col.type = new ConfigType(configService);
        col.type.nested = false;
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.alias = 'GridColumn';
        col.uiStyles.attributes.showAsLink = true;
        expect(hostComponent.showValue(col)).toBeFalsy();
    });

    it('showValue(col) should return false for link', () => {
        const col = new ParamConfig(configService);
        col.type = new ConfigType(configService);
        col.type.nested = false;
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.alias = 'Link';
        expect(hostComponent.showValue(col)).toBeFalsy();
    });

    it('showValue(col) should return false for button', () => {
        const col = new ParamConfig(configService);
        col.type = new ConfigType(configService);
        col.type.nested = false;
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.alias = 'Button';
        expect(hostComponent.showValue(col)).toBeFalsy();
    });

    it('showValue(col) should return false for link Menu', () => {
        const col = new ParamConfig(configService);
        col.type = new ConfigType(configService);
        col.type.nested = false;
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.alias = 'LinkMenu';
        expect(hostComponent.showValue(col)).toBeFalsy();
    });

    it('showValue(col) should return false for grid row body', () => {
        const col = new ParamConfig(configService);
        col.type = new ConfigType(configService);
        col.type.nested = false;
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.alias = 'GridRowBody';
        expect(hostComponent.showValue(col)).toBeFalsy();
    });

    it('showUiStyleInColumn(col) should return true for link', () => {
        const col = new ParamConfig(configService);
        col.type = new ConfigType(configService);
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.alias = 'Link';
        expect(hostComponent.showUiStyleInColumn(col)).toBeTruthy();
    });

    it('showUiStyleInColumn(col) should return true for button', () => {
        const col = new ParamConfig(configService);
        col.type = new ConfigType(configService);
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.alias = 'Button';
        expect(hostComponent.showUiStyleInColumn(col)).toBeTruthy();
    });

    it('showUiStyleInColumn(col) should return true for linkMenu', () => {
        const col = new ParamConfig(configService);
        col.type = new ConfigType(configService);
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.alias = 'LinkMenu';
        expect(hostComponent.showUiStyleInColumn(col)).toBeTruthy();
    });

    it('showUiStyleInColumn(col) should return false', () => {
        const col = new ParamConfig(configService);
        col.type = new ConfigType(configService);
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.alias = 'TextBox';
        expect(hostComponent.showUiStyleInColumn(col)).toBeFalsy();
    });

    it('showUiStyleInColumn(col) should return false', () => {
        const col = new ParamConfig(configService);
        col.type = new ConfigType(configService);
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.alias = 'Link1';
        expect(hostComponent.showUiStyleInColumn(col)).toBeFalsy();
    });

    it('showLinkMenu(col) should return truee', () => {
        const col = new ParamConfig(configService);
        col.type = new ConfigType(configService);
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.alias = 'LinkMenu';
        expect(hostComponent.showLinkMenu(col)).toBeTruthy();
    });

    it('showLinkMenu(col) should return false', () => {
        const col = new ParamConfig(configService);
        col.type = new ConfigType(configService);
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.alias = '1LinkMenu';
        expect(hostComponent.showLinkMenu(col)).toBeFalsy();
    });

    it('getViewParam() should return element.collectionParams object', () => {
        const col = new ParamConfig(configService);
        col.code = '2';
        hostComponent.element.path = '/test';
        hostComponent.element.collectionParams[0].path = '/test/1/2'
        expect(hostComponent.getViewParam(col, 1).path).toEqual('/test/1/2');
    });

    it('isClickedOnDropDown() should return true', () => {
        const dArray = new ActionDropdown(webContentSvc, pageService, elementRef);
        dArray['elementRef'].nativeElement.contains = () => { return true };
        expect(hostComponent.isClickedOnDropDown([dArray], 'te')).toBeTruthy();
    });

    it('isClickedOnDropDown() should return false', () => {
        const dArray = new ActionDropdown(webContentSvc, pageService, elementRef);
        dArray['elementRef'].nativeElement.contains = () => { return false };
        expect(hostComponent.isClickedOnDropDown([dArray], 'te')).toBeFalsy();
    });

    it('isActive() should return true', () => {
        hostComponent.filterState = [123];
        expect(hostComponent.isActive(0)).toBeTruthy();
    });

    it('isActive()should return false', () => {
        hostComponent.filterState = [123];
        expect(hostComponent.isActive(1)).toBeFalsy();
    });

    it('getRowPath() should return path', () => {
        const col = new ParamConfig(configService);
        col.code = '123';
        hostComponent.element.path = '/test';
        const item = { elemId: 456 };
        expect(hostComponent.getRowPath(col, item)).toEqual('/test/456/123');
    });

    it('processOnClick() should call pageService.processEvent()', () => {
        const col = new ParamConfig(configService);
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.b = '';
        col.uiStyles.attributes.method = '';
        hostComponent.element.path = '';
        spyOn(pageService, 'processEvent').and.returnValue('');
        hostComponent.processOnClick(col, { elemId: '' });
        expect(pageService.processEvent).toHaveBeenCalled();
    });

    it('processOnClick() should call pageService.processEvent() based on getAllURLParams()', () => {
        const col = new ParamConfig(configService);
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.b = '';
        col.uiStyles.attributes.method = '';
        hostComponent.element.path = '';
        spyOn(pageService, 'processEvent').and.returnValue('');
        spyOn(hostComponent, 'getAllURLParams').and.returnValue(['test']);
        hostComponent.processOnClick(col, { elemId: '', es: 't' });
        expect(pageService.processEvent).toHaveBeenCalled();
    });

    it('processOnClick() should call pageService.processEvent() based on getAllURLParams() and argument', () => {
        const col = new ParamConfig(configService);
        col.uiStyles = new UiStyle();
        col.uiStyles.attributes = new UiAttribute();
        col.uiStyles.attributes.b = '';
        col.uiStyles.attributes.method = '';
        hostComponent.element.path = '';
        spyOn(pageService, 'processEvent').and.returnValue('');
        spyOn(hostComponent, 'getAllURLParams').and.returnValue(['test']);
        hostComponent.processOnClick(col, { elemId: '' });
        expect(pageService.processEvent).toHaveBeenCalled();
    });

    it('toggleFilter() should update the showFilters property', () => {
        hostComponent.showFilters = true;
        hostComponent.toggleFilter('');
        expect(hostComponent.showFilters).toBeFalsy();
    });

    it('postGridData() should call the pageService.processEvent()', () => {
        fixture.whenStable().then(() => {
            const eleConfig = { code: '', uiStyles: { attributes: { postButtonTargetPath: true, postButtonUrl: '/test' } } };
            spyOn(configService, 'getViewConfigById').and.returnValue(eleConfig);
            hostComponent.selectedRows = [{ elemId: 123 }];
            spyOn(pageService, 'processEvent').and.returnValue('');
            hostComponent.postGridData({});
            expect(pageService.processEvent).toHaveBeenCalled();
        });
    });

    it('resetMultiSelection should update the selectedRows property', () => {
        hostComponent.resetMultiSelection();
        expect(hostComponent.selectedRows).toEqual([]);
    });

    it('customSort() should not sort value array for number type', () => {
        const eve = { order: -1, field: { code: 'test', uiStyles: { attributes: { sortAs: 'NUMBER' } }, type: { name: 't' } } };
        hostComponent.value = [{ test: null, index: 1 }, { test: null, index: 2 }];
        const value = hostComponent.value;
        hostComponent.customSort(eve);
        expect(hostComponent.value).toEqual(value);
    });

    it('customSort() should sort value array for number type, if first code is null', () => {
        const eve = { order: -2, field: { code: 'test', uiStyles: { attributes: { sortAs: 'NUMBER' } }, type: { name: 't' } } };
        hostComponent.value = [{ test: null, index: 4 }, { test: 1, index: 3 }];
        hostComponent.customSort(eve);
        expect(hostComponent.value[0].index).toEqual(3);
    });

    it('customSort() should sort value array for number type, if second code is null', () => {
        const eve = { order: 1, field: { order: 1, code: 'test', uiStyles: { attributes: { sortAs: 'NUMBER' } }, type: { name: 't' } } };
        hostComponent.value = [{ index: 2, test: 1 }, { index: 1, test: null }];
        hostComponent.customSort(eve);
        expect(hostComponent.value[0].index).toEqual(1);
    });

    it('customSort() should sort value array for number type, if second code less than first code', () => {
        const eve = { order: 1, field: { code: 'test', uiStyles: { attributes: { sortAs: 'NUMBER' } }, type: { name: 't' } } };
        hostComponent.value = [{ index: 5, test: 1 }, { index: 1, test: 0 }];
        hostComponent.customSort(eve);
        expect(hostComponent.value[0].index).toEqual(1);
    });

    it('customSort() should sort value array for number type, if first code less than second code', () => {
        const eve = { order: -1, field: { code: 'test', uiStyles: { attributes: { sortAs: 'NUMBER' } }, type: { name: 't' } } };
        hostComponent.value = [{ test: 1, index: 4 }, { test: 2, index: 1 }];
        hostComponent.customSort(eve);
        expect(hostComponent.value[0].index).toEqual(1);
    });

    it('customSort() should sort value array for number type, if both codes are equal', () => {
        const eve = { field: { code: 'test', uiStyles: { attributes: { sortAs: 'NUMBER' } }, type: { name: 't' } } };
        hostComponent.value = [{ index: 1, test: 1 }, { index: 2, test: 1 }];
        const value = hostComponent.value;
        hostComponent.customSort(eve);
        expect(hostComponent.value).toEqual(value);
    });

    it('customSort() should not sort value array for Date type', () => {
        const eve = { order: 1, field: { code: 'test', uiStyles: { attributes: { sortAs: 'DATE' } }, type: { name: 't' } } };
        hostComponent.value = [{ test: null }, { test: null }];
        const value = hostComponent.value;
        hostComponent.customSort(eve);
        expect(hostComponent.value).toEqual(value);
    });

    it('customSort() should sort value array for Date type, if first code is null', () => {
        const eve = { order: -1, field: { code: 'test', uiStyles: { attributes: { sortAs: 'DATE' } }, type: { name: 't' } } };
        hostComponent.value = [{ test: null }, { test: 1 }];
        hostComponent.customSort(eve);
        expect(hostComponent.value[0].test).toEqual(1);
    });

    it('customSort() should not sort value arra', () => {
        const eve = { order: 1, field: { code: 'test', uiStyles: { attributes: { sortAs: 's' } }, type: { name: 't' } } };
        hostComponent.value = [{ test: null }, { test: null }];
        const value = hostComponent.value;
        hostComponent.customSort(eve);
        expect(hostComponent.value).toEqual(value);
    });

    it('customSort() should sort value array, if first code is null', () => {
        const eve = { order: -1, field: { code: 'test', uiStyles: { attributes: { sortAs: 's' } }, type: { name: 't' } } };
        hostComponent.value = [{ test: null }, { test: 11 }];
        hostComponent.customSort(eve);
        expect(hostComponent.value[0].test).toEqual(11);
    });

    it('customSort() should sort value array, if second code is null', () => {
        const eve = { order: 1, field: { code: 'test', uiStyles: { attributes: { sortAs: 's' } }, type: { name: 't' } } };
        hostComponent.value = [{ test: 111 }, { test: null }];
        hostComponent.customSort(eve);
        expect(hostComponent.value[0].test).toEqual(null);
    });

    it('customSort() should sort value array, if second code less than first code', () => {
        const eve = { order: 1, field: { code: 'test', uiStyles: { attributes: { sortAs: 's' } }, type: { name: 't' } } };
        hostComponent.value = [{
            test: {
                x: 2,
                localeCompare: () => {
                    return 1;
                }
            }
        }, {
            test: {
                x: 1,
                localeCompare: () => {
                    return -1;
                }
            }
        }];
        hostComponent.customSort(eve);
        expect(hostComponent.value[0].test.x).toEqual(1);
    });

    it('isSortAsNumber() should return true for int, NUMBER argument', () => {
        const res = (hostComponent as any).isSortAsNumber('int', 'NUMBER');
        expect(res).toBeTruthy();
    });

    it('isSortAsNumber() should return true for int, null argument', () => {
        const res = (hostComponent as any).isSortAsNumber('int', null);
        expect(res).toBeTruthy();
    });

    it('isSortAsNumber() should return true for integer, null argument', () => {
        const res = (hostComponent as any).isSortAsNumber('integer', null);
        expect(res).toBeTruthy();
    });

    it('isSortAsNumber() should return true for long, null argument', () => {
        const res = (hostComponent as any).isSortAsNumber('long', null);
        expect(res).toBeTruthy();
    });

    it('isSortAsNumber() should return true for double, null argument', () => {
        const res = (hostComponent as any).isSortAsNumber('double', null);
        expect(res).toBeTruthy();
    });

    it('isSortAsDate() should return true for int, DATE argument', () => {
        const res = (hostComponent as any).isSortAsNumber('int', 'DATE');
        expect(res).toBeTruthy();
    });

    it('between() should return false', () => {
        expect(hostComponent.between('day', 1)).toBeFalsy();
    });

    it('dateFilter() should call updatePageDetailsState() and dt.filter()', () => {
        const e = new Date();
        const dt = new Table(elementRef, domHandler, objectUtils, null, tableService);
        const datePattern = 'MMDDYYYY';
        spyOn(hostComponent, 'updatePageDetailsState').and.callThrough();
        spyOn(dt, 'filter').and.callThrough();
        hostComponent.dateFilter(e, dt, '', datePattern);
        expect(hostComponent.updatePageDetailsState).toHaveBeenCalled();
        expect(dt.filter).toHaveBeenCalled();
    });

    // it('inputFilter() shlould call dt.filter()', ()=> {
    //   const dt:any = { filter: () => {} };
    //   spyOn(dt, 'filter').and.returnValue(true);
    //   hostComponent.inputFilter({ target: { value: 1 } }, dt, 't', 't');
    //   setTimeout(() => {
    //     expect(dt.filter).toHaveBeenCalled();
    //   }, 600);
    // });

    // it('inputFilter() shlould call dt.filter() based onb the filterTimeout property', ()=> {
    //   const dt:any = { filter: () => {} };
    //   spyOn(dt, 'filter').and.returnValue(true);
    //   hostComponent.filterTimeout = true;
    //   hostComponent.inputFilter({ target: { value: 1 } }, dt, 't', 't');
    //   setTimeout(() => {
    //     expect(dt.filter).toHaveBeenCalled();
    //   }, 600);
    // });

    it('clearFilter() shlould call dt.filter()', () => {
        const dt: any = { filter: () => { } };
        spyOn(dt, 'filter').and.returnValue('');
        hostComponent.clearFilter({ value: 1 }, dt, 'as', 1);
        expect(dt.filter).toHaveBeenCalled();
    });

    it('clearAll() should calldt.reset() and update the filterState property', () => {
        spyOn(hostComponent.dt, 'reset').and.returnValue('');
        hostComponent.clearAll();
        expect(hostComponent.dt.reset).toHaveBeenCalled();
        expect(hostComponent.filterState).toEqual([]);
    });

    it('paginate() should update the rowEnd property', () => {
        const eve = { first: 12, rows: 2 };
        hostComponent.totalRecords = 15;
        hostComponent.paginate(eve);
        expect(hostComponent.rowEnd).toEqual(14);
    });

    it('paginate() should update the rowEnd property based on the totalRecords value', () => {
        const eve = { first: 12, rows: 2 };
        hostComponent.totalRecords = 13;
        hostComponent.paginate(eve);
        expect(hostComponent.rowEnd).toEqual(13);
    });

    it('updatePageDetailsState() should update the rowStart property', () => {
        fixture.whenStable().then(() => {
            hostComponent.totalRecords = 1;
            const eleConfig = { code: '', uiStyles: { attributes: { pageSize: 3 } } };
            spyOn(configService, 'getViewConfigById').and.returnValue(eleConfig);
            hostComponent.updatePageDetailsState();
            expect(hostComponent.rowStart).toEqual(1);
        });
    });

    it('updatePageDetailsState() should update the rowStart property as 0', () => {
        hostComponent.totalRecords = 0;
        hostComponent.element = new Param(configService);
        const eleConfig = { code: '', uiStyles: { attributes: { pageSize: 3 } } };
        spyOn(configService, 'getViewConfigById').and.returnValue(eleConfig);
        hostComponent.updatePageDetailsState();
        expect(hostComponent.rowStart).toEqual(0);
    });

    it('filterCallBack() should call the updatePageDetailsState()', () => {
        const eve = { filteredValue: [1] };
        spyOn(hostComponent, 'updatePageDetailsState').and.returnValue('');
        hostComponent.selectedRows = [];
        hostComponent.filterCallBack(eve);
        expect(hostComponent.updatePageDetailsState).toHaveBeenCalled();
        expect(hostComponent.totalRecords).toEqual(1);
    });

    it('toggleOpen() should call the mouseEventSubscription.unsubscribe()', () => {
        const eve = { isOpen: true, state: 'openPanel' };
        const obj = { x: 10 };
        const test = observableOf(obj);
        hostComponent.mouseEventSubscription = test.subscribe();
        spyOn(hostComponent.mouseEventSubscription, 'unsubscribe').and.callThrough();
        hostComponent.mouseEventSubscription.closed = false;
        hostComponent.toggleOpen(eve);
        expect(hostComponent.mouseEventSubscription.unsubscribe).toHaveBeenCalled();
    });

    it('toggleOpen() should not call the mouseEventSubscription.unsubscribe()', () => {
        const eve = { isOpen: true, state: 'openPanel' };
        const obj = { x: 10 };
        const test = observableOf(obj);
        hostComponent.mouseEventSubscription = test.subscribe();
        hostComponent.mouseEventSubscription.closed = true;
        spyOn(hostComponent.mouseEventSubscription, 'unsubscribe').and.callThrough();
        hostComponent.toggleOpen(eve);
        expect(hostComponent.mouseEventSubscription.unsubscribe).not.toHaveBeenCalled();
    });

    it('toggleOpen() should not call the mouseEventSubscription.unsubscribe() based on eve.state', () => {
        const eve = { isOpen: true, state: '1openPanel' };
        const obj = { x: 10 };
        const test = observableOf(obj);
        hostComponent.mouseEventSubscription = test.subscribe();
        hostComponent.mouseEventSubscription.closed = true;
        spyOn(hostComponent.mouseEventSubscription, 'unsubscribe').and.callThrough();
        hostComponent.toggleOpen(eve);
        expect(hostComponent.mouseEventSubscription.unsubscribe).not.toHaveBeenCalled();
    });

    it('toggleOpen() should not call the mouseEventSubscription.unsubscribe() based on dropDowns property', () => {
        (hostComponent as any).dropDowns = {
            toArray: () => {
                return [{ isOpen: true, selectedItem: false, state: '' }];
            }
        };
        const eve = { isOpen: true, state: '1openPanel' };
        const obj = { x: 10 };
        const test = observableOf(obj);
        hostComponent.mouseEventSubscription = test.subscribe();
        hostComponent.mouseEventSubscription.closed = false;
        spyOn(hostComponent.mouseEventSubscription, 'unsubscribe').and.callThrough();
        hostComponent.toggleOpen(eve);
        expect(hostComponent.mouseEventSubscription.unsubscribe).not.toHaveBeenCalled();
    });

    it('export() should call dt.exportCSV()', () => {
        const tDate = new Date('December 17, 2017');
        (hostComponent as any).dt = { filteredValue: [{ a: tDate }], value: [], exportCSV: () => { } };
        hostComponent.params = [new ParamConfig(configService)];
        hostComponent.params[0].code = 'a';
        hostComponent.params[0].type = new ConfigType(configService);
        hostComponent.params[0].type.name = 'Date'
        hostComponent.params[0].uiStyles = new UiStyle();
        hostComponent.params[0].uiStyles.attributes = new UiAttribute();
        hostComponent.params[0].uiStyles.attributes.datePattern = '';
        spyOn(hostComponent.dt, 'exportCSV').and.callThrough();
        hostComponent.export();
        expect(hostComponent.dt.exportCSV).toHaveBeenCalled();
    });

    it('export() should call dt.exportCSV() even without dt.filterValue.a', () => {
        const tDate = new Date('December 17, 2017');
        (hostComponent as any).dt = { filteredValue: [{ a: '' }], value: [], exportCSV: () => { } };
        hostComponent.params = [new ParamConfig(configService)];
        hostComponent.params[0].code = 'a';
        hostComponent.params[0].type = new ConfigType(configService);
        hostComponent.params[0].type.name = 'Date'
        spyOn(hostComponent.dt, 'exportCSV').and.callThrough();
        hostComponent.export();
        expect(hostComponent.dt.exportCSV).toHaveBeenCalled();
    });

    it('export() should call dt.exportCSV() even without dt.filterValue', () => {
        const tDate = new Date('December 17, 2017');
        (hostComponent as any).dt = { filteredValue: [{}], value: [], exportCSV: () => { } };
        hostComponent.params = [new ParamConfig(configService)];
        hostComponent.params[0].code = 'a';
        hostComponent.params[0].type = null;
        spyOn(hostComponent.dt, 'exportCSV').and.callThrough();
        hostComponent.export();
        expect(hostComponent.dt.exportCSV).toHaveBeenCalled();
    });

    it('ngOnDestroy() should call the mouseEventSubscription.unsubscribe and cd.detach()', () => {
        (hostComponent as any).mouseEventSubscription = { unsubscribe: () => { } };
        const spy = spyOn((hostComponent as any).cd, 'detach').and.callThrough();
        spyOn(hostComponent.mouseEventSubscription, 'unsubscribe').and.callThrough();
        hostComponent.ngOnDestroy();
        expect(spy).toHaveBeenCalled();
        expect(hostComponent.mouseEventSubscription.unsubscribe).toHaveBeenCalled();
    });

    it('ngOnDestroy() should call the cd.detach()', () => {
        const spy = spyOn((hostComponent as any).cd, 'detach').and.returnValue('');
        hostComponent.ngOnDestroy();
        expect(spy).toHaveBeenCalled();
    });

    it('loadDataLazy() call getQueryString() with 4, DESC', () => {
        fixture.whenStable().then(() => {
            const eleConfig = { code: '', uiStyles: { attributes: { pageSize: 1 } } };
            spyOn(configService, 'getViewConfigById').and.returnValue(eleConfig);
            const eve = { first: 12, sortField: { code: '' }, sortOrder: 22, filters: [{ value: '' }] };
            spyOn(hostComponent, 'getQueryString').and.callThrough();
            hostComponent.loadDataLazy(eve);
            expect(hostComponent.getQueryString).toHaveBeenCalled();
            expect(hostComponent.getQueryString).toHaveBeenCalledWith(4, ',DESC');
        });
    });

    it('loadDataLazy() call getQueryString() with 0, DESC', () => {
        fixture.whenStable().then(() => {
            const eleConfig = { code: '', uiStyles: { attributes: { pageSize: 1 } } };
            spyOn(configService, 'getViewConfigById').and.returnValue(eleConfig);
            const eve = { first: 0, sortField: { code: '' }, sortOrder: 22, filters: [{ value: '' }] };
            spyOn(hostComponent, 'getQueryString').and.callThrough();
            hostComponent.loadDataLazy(eve);
            expect(hostComponent.getQueryString).toHaveBeenCalled();
            expect(hostComponent.getQueryString).toHaveBeenCalledWith(0, ',DESC');
        });
    });

    it('loadDataLazy() call getQueryString() with 0, ASC', () => {
        fixture.whenStable().then(() => {
            const eleConfig = { code: '', uiStyles: { attributes: { pageSize: 1 } } };
            spyOn(configService, 'getViewConfigById').and.returnValue(eleConfig);
            const eve = { first: 0, sortField: { code: '' }, sortOrder: 1, filters: [{ value: '' }] };
            spyOn(hostComponent, 'getQueryString').and.callThrough();
            hostComponent.loadDataLazy(eve);
            expect(hostComponent.getQueryString).toHaveBeenCalled();
            expect(hostComponent.getQueryString).toHaveBeenCalledWith(0, ',ASC');
        });
    });

    it('loadDataLazy() call getQueryString() with 0, undefined', () => {
        fixture.whenStable().then(() => {
            const eleConfig = { code: '', uiStyles: { attributes: { pageSize: 1 } } };
            spyOn(configService, 'getViewConfigById').and.returnValue(eleConfig);
            const eve = { first: 0, sortField: false, sortOrder: 1, filters: [{ value: '' }] };
            spyOn(hostComponent, 'getQueryString').and.callThrough();
            hostComponent.loadDataLazy(eve);
            expect(hostComponent.getQueryString).toHaveBeenCalled();
            expect(hostComponent.getQueryString).toHaveBeenCalledWith(0, undefined);
        });
    });

    it('loadDataLazy() call getQueryString() with 0, ASC, if eve.filters is not avilable', () => {
        fixture.whenStable().then(() => {
            const eleConfig = { code: '', uiStyles: { attributes: { pageSize: 1 } } };
            spyOn(configService, 'getViewConfigById').and.returnValue(eleConfig);
            const eve = { first: 0, sortField: { code: '' }, sortOrder: 1 };
            spyOn(hostComponent, 'getQueryString').and.callThrough();
            hostComponent.loadDataLazy(eve);
            expect(hostComponent.getQueryString).toHaveBeenCalled();
            expect(hostComponent.getQueryString).toHaveBeenCalledWith(0, ',ASC');
        });
    });

    it('getQueryString(1, ASC) should return &sortBy=ASC&pageSize=1&page=1', () => {
        fixture.whenStable().then(() => {
            const eleConfig = { code: '', uiStyles: { attributes: { pageSize: 1 } } };
            spyOn(configService, 'getViewConfigById').and.returnValue(eleConfig);
            const res = hostComponent.getQueryString(1, 'ASC');
            expect(res).toEqual('&sortBy=ASC&pageSize=3&page=1');
        });
    });

    it('getQueryString(1, null) should return &pageSize=1&page=1', () => {
        fixture.whenStable().then(() => {
            const eleConfig = { code: '', uiStyles: { attributes: { pageSize: 1 } } };
            spyOn(configService, 'getViewConfigById').and.returnValue(eleConfig);
            const res = hostComponent.getQueryString(1, null);
            expect(res).toEqual('&pageSize=3&page=1');
        });
    });

    it('getQueryString(undefined, null) should return empty string', () => {
        fixture.whenStable().then(() => {
            const eleConfig = { code: '', uiStyles: { attributes: { pageSize: 1 } } };
            spyOn(configService, 'getViewConfigById').and.returnValue(eleConfig);
            const res = hostComponent.getQueryString(undefined, null);
            expect(res).toEqual('');
        });
    });

    it('getPattern() should return numPattern value', () => {
        spyOn((hostComponent as any), 'isSortAsNumber').and.returnValue(true);
        (hostComponent as any).numPattern = 'test';
        expect(hostComponent.getPattern('')).toEqual('test');
    });

    it('getPattern() should return defaultPattern value', () => {
        spyOn((hostComponent as any), 'isSortAsNumber').and.returnValue(false);
        (hostComponent as any).defaultPattern = 'test';
        expect(hostComponent.getPattern('')).toEqual('test');
    });

});

// const tableParams: any = [
//   {
//       "active": false,
//       "required": false,
//       "id": "665",
//       "code": "id",
//       "validations": null,
//       "uiNatures": [],
//       "uiStyles": {
//           "isLink": false,
//           "isHidden": false,
//           "name": "ViewConfig.GridColumn",
//           "attributes": {
//               "hidden": true,
//               "readOnly": false,
//               "submitButton": true,
//               "showName": true,
//               "pageSize": 25,
//               "browserBack": false,
//               "showAsLink": false,
//               "rowExpander": false,
//               "expandable": true,
//               "applyValueStyles": false,
//               "sortable": true,
//               "filter": true,
//               "filterMode": "equals",
//               "cssClass": "",
//               "filterValue": "",
//               "datePattern": "",
//               "alias": "GridColumn",
//               "placeholder": "",
//               "sortAs": "DEFAULT"
//           }
//       },
//       "type": {
//           "collection": false,
//           "nested": false,
//           "name": "long"
//       },
//       "field": "id",
//       "exportable": false
//   },
//   {
//     "active": false,
//     "required": false,
//     "id": "666",
//     "code": "appointment",
//     "validations": null,
//     "uiNatures": [],
//     "uiStyles": {
//         "isLink": false,
//         "isHidden": false,
//         "name": "ViewConfig.GridColumn",
//         "attributes": {
//             "hidden": false,
//             "readOnly": false,
//             "submitButton": true,
//             "showName": true,
//             "pageSize": 25,
//             "browserBack": false,
//             "showAsLink": false,
//             "rowExpander": false,
//             "expandable": true,
//             "applyValueStyles": false,
//             "sortable": true,
//             "filter": true,
//             "filterMode": "equals",
//             "cssClass": "",
//             "filterValue": "",
//             "datePattern": "",
//             "alias": "GridColumn",
//             "placeholder": "",
//             "sortAs": "DEFAULT"
//         }
//     },
//     "type": {
//         "collection": false,
//         "nested": false,
//         "name": "LocalDate"
//     },
//     "label": "Appointment Date",
//     "field": "appointment",
//     "header": "Appointment Date",
//     "exportable": true
// },
// {
//   "active": false,
//   "required": false,
//   "id": "667",
//   "code": "ownerName",
//   "validations": null,
//   "uiNatures": [],
//   "uiStyles": {
//       "isLink": false,
//       "isHidden": false,
//       "name": "ViewConfig.GridColumn",
//       "attributes": {
//           "hidden": false,
//           "readOnly": false,
//           "submitButton": true,
//           "showName": true,
//           "pageSize": 25,
//           "browserBack": false,
//           "showAsLink": false,
//           "rowExpander": false,
//           "expandable": true,
//           "applyValueStyles": false,
//           "sortable": true,
//           "filter": true,
//           "filterMode": "equals",
//           "cssClass": "",
//           "filterValue": "",
//           "datePattern": "",
//           "alias": "GridColumn",
//           "placeholder": "",
//           "sortAs": "DEFAULT"
//       }
//   },
//   "type": {
//       "collection": false,
//       "nested": false,
//       "name": "string"
//   },
//   "label": "Owner's name",
//   "field": "ownerName",
//   "header": "Owner's name",
//   "exportable": true
// },
// {
//   "active": false,
//   "required": false,
//   "id": "668",
//   "code": "petName",
//   "validations": null,
//   "uiNatures": [],
//   "uiStyles": {
//       "isLink": false,
//       "isHidden": false,
//       "name": "ViewConfig.GridColumn",
//       "attributes": {
//           "hidden": false,
//           "readOnly": false,
//           "submitButton": true,
//           "showName": true,
//           "pageSize": 25,
//           "browserBack": false,
//           "showAsLink": false,
//           "rowExpander": false,
//           "expandable": true,
//           "applyValueStyles": false,
//           "sortable": true,
//           "filter": true,
//           "filterMode": "equals",
//           "cssClass": "",
//           "filterValue": "",
//           "datePattern": "",
//           "alias": "GridColumn",
//           "placeholder": "",
//           "sortAs": "DEFAULT"
//       }
//   },
//   "type": {
//       "collection": false,
//       "nested": false,
//       "name": "string"
//   },
//   "label": "Pet's name",
//   "field": "petName",
//   "header": "Pet's name",
//   "exportable": true
// },
// {
//   "active": false,
//   "required": false,
//   "id": "669",
//   "code": "reasonForVisit",
//   "validations": null,
//   "uiNatures": [],
//   "uiStyles": {
//       "isLink": false,
//       "isHidden": false,
//       "name": "ViewConfig.GridColumn",
//       "attributes": {
//           "hidden": false,
//           "readOnly": false,
//           "submitButton": true,
//           "showName": true,
//           "pageSize": 25,
//           "browserBack": false,
//           "showAsLink": false,
//           "rowExpander": false,
//           "expandable": true,
//           "applyValueStyles": false,
//           "sortable": true,
//           "filter": true,
//           "filterMode": "equals",
//           "cssClass": "",
//           "filterValue": "",
//           "datePattern": "",
//           "alias": "GridColumn",
//           "placeholder": "",
//           "sortAs": "DEFAULT"
//       }
//   },
//   "type": {
//       "collection": false,
//       "nested": false,
//       "name": "string"
//   },
//   "label": "Reason For Visit",
//   "field": "reasonForVisit",
//   "header": "Reason For Visit",
//   "exportable": true
// },
// {
//   "active": false,
//   "required": false,
//   "id": "670",
//   "code": "status",
//   "validations": null,
//   "uiNatures": [],
//   "uiStyles": {
//       "isLink": true,
//       "isHidden": false,
//       "name": "ViewConfig.GridColumn",
//       "attributes": {
//           "hidden": false,
//           "readOnly": false,
//           "submitButton": true,
//           "showName": true,
//           "pageSize": 25,
//           "browserBack": false,
//           "showAsLink": true,
//           "rowExpander": false,
//           "expandable": true,
//           "applyValueStyles": false,
//           "sortable": true,
//           "filter": true,
//           "filterMode": "equals",
//           "cssClass": "",
//           "filterValue": "",
//           "datePattern": "",
//           "alias": "GridColumn",
//           "placeholder": "",
//           "sortAs": "DEFAULT"
//       }
//   },
//   "type": {
//       "collection": false,
//       "nested": false,
//       "name": "string"
//   },
//   "label": "Status",
//   "field": "status",
//   "header": "Status",
//   "exportable": true
// },
// {
//   "active": false,
//   "required": false,
//   "id": "671",
//   "code": "showHistory",
//   "validations": null,
//   "uiStyles": {
//       "isLink": false,
//       "isHidden": false,
//       "name": "ViewConfig.Button",
//       "attributes": {
//           "hidden": false,
//           "readOnly": false,
//           "submitButton": true,
//           "showName": true,
//           "pageSize": 25,
//           "browserBack": false,
//           "showAsLink": false,
//           "b": "$execute",
//           "method": "GET",
//           "formReset": true,
//           "type": "button",
//           "title": "",
//           "url": "",
//           "printPath": "",
//           "cssClass": "text-sm-right",
//           "payload": "",
//           "alias": "Button",
//           "style": "PLAIN",
//           "imgSrc": "",
//           "imgType": "FA"
//       }
//   },
//   "type": {
//       "collection": false,
//       "nested": false,
//       "name": "string"
//   },
//   "uiNatures": [
//       {
//           "name": "ViewConfig.Hints",
//           "attributes": {
//               "hidden": false,
//               "readOnly": false,
//               "submitButton": true,
//               "showName": true,
//               "pageSize": 25,
//               "browserBack": false,
//               "showAsLink": false,
//               "value": "Right"
//           }
//       }
//   ],
//   "label": "testsing btn in table",
//   "field": "showHistory",
//   "header": "testsing btn in table",
//   "exportable": false
// },
// {
//   "active": false,
//   "required": false,
//   "id": "672",
//   "code": "petQuestionnaire",
//   "validations": null,
//   "uiNatures": [],
//   "uiStyles": {
//       "isLink": true,
//       "isHidden": false,
//       "name": "ViewConfig.Link",
//       "attributes": {
//           "hidden": false,
//           "readOnly": false,
//           "submitButton": true,
//           "showName": true,
//           "pageSize": 25,
//           "browserBack": false,
//           "showAsLink": false,
//           "b": "$executeAnd$nav",
//           "method": "GET",
//           "cssClass": "",
//           "altText": "",
//           "rel": "",
//           "alias": "Link",
//           "value": "DEFAULT",
//           "imgSrc": "edit.png",
//           "url": "",
//           "target": ""
//       }
//   },
//   "type": {
//       "collection": false,
//       "nested": false,
//       "name": "string"
//   },
//   "label": "Pet Questionnaire",
//   "field": "petQuestionnaire",
//   "header": "Pet Questionnaire",
//   "exportable": false
// },
// {
//   "active": false,
//   "required": false,
//   "id": "673",
//   "code": "vlmVisitItemLinks",
//   "validations": null,
//   "uiNatures": [],
//   "uiStyles": {
//       "isLink": true,
//       "isHidden": false,
//       "name": "ViewConfig.LinkMenu",
//       "attributes": {
//           "hidden": false,
//           "readOnly": false,
//           "submitButton": true,
//           "showName": true,
//           "pageSize": 25,
//           "browserBack": false,
//           "showAsLink": false,
//           "cssClass": "dropdownTrigger",
//           "alias": "LinkMenu",
//           "imgSrc": "",
//           "imgType": "FA"
//       }
//   },
//   "type": {
//       "collection": false,
//       "nested": true,
//       "name": "VisitLineItem.VLMVisitItemLinks",
//       "model": {
//           "paramConfigIds": [
//               "675",
//               "676"
//           ]
//       }
//   },
//   "field": "vlmVisitItemLinks",
//   "exportable": false
// }
// ];


// const tableElement: any = {
//     "config": {
//         "active": false,
//         "required": false,
//         "id": "705",
//         "code": "visitBulkAction",
//         "validations": null,
//         "uiNatures": [],
//         "uiStyles": {
//             "isLink": false,
//             "isHidden": false,
//             "name": "ViewConfig.Grid",
//             "attributes": {
//                 "hidden": false,
//                 "readOnly": false,
//                 "submitButton": true,
//                 "showName": true,
//                 "pageSize": 3,
//                 "browserBack": false,
//                 "showAsLink": false,
//                 "headerCheckboxToggleAllPages": false,
//                 "rowSelection": true,
//                 "postButtonUrl": "",
//                 "pagination": true,
//                 "dataEntryField": true,
//                 "postButtonTargetPath": "ids",
//                 "postButtonUri": "../actionCancelVisits",
//                 "expandableRows": true,
//                 "showHeader": true,
//                 "postEventOnChange": false,
//                 "lazyLoad": false,
//                 "url": "",
//                 "dataKey": "id",
//                 "cssClass": "",
//                 "clearAllFilters": true,
//                 "postButtonLabel": "Cancel",
//                 "alias": "Grid",
//                 "onLoad": true,
//                 "postButtonAlias": "",
//                 "isTransient": false,
//                 "postButton": true,
//                 "export": true
//             }
//         },
//         "type": {
//             "collection": true,
//             "nested": true,
//             "name": "ArrayList",
//             "collectionType": "list",
//             "model": {
//                 "paramConfigIds": []
//             },
//             "elementConfig": {
//                 "id": "708",
//                 "type": {
//                     "collection": false,
//                     "nested": true,
//                     "name": "VisitLineItem",
//                     "model": {
//                         "paramConfigIds": [
//                             "673",
//                             "674",
//                             "675",
//                             "676",
//                             "677",
//                             "678",
//                             "679",
//                             "680",
//                             "681",
//                             "685"
//                         ]
//                     }
//                 }
//             }
//         }
//     },
//     "enabled": true,
//     "visible": true,
//     "activeValidationGroups": [],
//     "collectionParams": [
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "678",
//                 "code": "status",
//                 "validations": null,
//                 "uiNatures": [],
//                 "uiStyles": {
//                     "isLink": true,
//                     "isHidden": false,
//                     "name": "ViewConfig.GridColumn",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": true,
//                         "rowExpander": false,
//                         "expandable": true,
//                         "applyValueStyles": false,
//                         "sortable": true,
//                         "filter": true,
//                         "filterMode": "equals",
//                         "cssClass": "",
//                         "filterValue": "",
//                         "datePattern": "",
//                         "alias": "GridColumn",
//                         "placeholder": "",
//                         "sortAs": "DEFAULT"
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": false,
//                     "name": "string"
//                 },
//                 "label": "Status",
//                 "field": "status",
//                 "header": "Status",
//                 "exportable": true
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "678",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/0/status",
//             "type": {
//                 "nested": false,
//                 "name": "string",
//                 "collection": false
//             },
//             "leafState": "",
//             "previousLeafState": "",
//             "message": [],
//             "values": [],
//             "labels": [
//                 {
//                     "locale": "en-US",
//                     "text": "Status"
//                 }
//             ],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "679",
//                 "code": "showHistory",
//                 "validations": null,
//                 "uiStyles": {
//                     "isLink": false,
//                     "isHidden": false,
//                     "name": "ViewConfig.Button",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": false,
//                         "b": "$execute",
//                         "method": "GET",
//                         "formReset": true,
//                         "type": "button",
//                         "title": "",
//                         "url": "",
//                         "printPath": "",
//                         "cssClass": "text-sm-right",
//                         "payload": "",
//                         "alias": "Button",
//                         "style": "PLAIN",
//                         "imgSrc": "",
//                         "imgType": "FA"
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": false,
//                     "name": "string"
//                 },
//                 "uiNatures": [
//                     {
//                         "name": "ViewConfig.Hints",
//                         "attributes": {
//                             "hidden": false,
//                             "readOnly": false,
//                             "submitButton": true,
//                             "showName": true,
//                             "pageSize": 25,
//                             "browserBack": false,
//                             "showAsLink": false,
//                             "value": "Right"
//                         }
//                     }
//                 ],
//                 "label": "testsing btn in table",
//                 "field": "showHistory",
//                 "header": "testsing btn in table",
//                 "exportable": false
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "679",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/0/showHistory",
//             "type": {
//                 "nested": false,
//                 "name": "string",
//                 "collection": false
//             },
//             "message": [],
//             "values": [],
//             "labels": [
//                 {
//                     "locale": "en-US",
//                     "text": "testsing btn in table"
//                 }
//             ],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "680",
//                 "code": "petQuestionnaire",
//                 "validations": null,
//                 "uiNatures": [],
//                 "uiStyles": {
//                     "isLink": true,
//                     "isHidden": false,
//                     "name": "ViewConfig.Link",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": false,
//                         "b": "$executeAnd$nav",
//                         "method": "GET",
//                         "cssClass": "",
//                         "altText": "",
//                         "rel": "",
//                         "alias": "Link",
//                         "value": "DEFAULT",
//                         "imgSrc": "edit.png",
//                         "url": "",
//                         "target": ""
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": false,
//                     "name": "string"
//                 },
//                 "label": "Pet Questionnaire",
//                 "field": "petQuestionnaire",
//                 "header": "Pet Questionnaire",
//                 "exportable": false
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "680",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/0/petQuestionnaire",
//             "type": {
//                 "nested": false,
//                 "name": "string",
//                 "collection": false
//             },
//             "message": [],
//             "values": [],
//             "labels": [
//                 {
//                     "locale": "en-US",
//                     "text": "Pet Questionnaire"
//                 }
//             ],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "681",
//                 "code": "vlmVisitItemLinks",
//                 "validations": null,
//                 "uiNatures": [],
//                 "uiStyles": {
//                     "isLink": true,
//                     "isHidden": false,
//                     "name": "ViewConfig.LinkMenu",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": false,
//                         "cssClass": "dropdownTrigger",
//                         "alias": "LinkMenu",
//                         "imgSrc": "",
//                         "imgType": "FA"
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": true,
//                     "name": "VisitLineItem.VLMVisitItemLinks",
//                     "model": {
//                         "paramConfigIds": [
//                             "683",
//                             "684"
//                         ]
//                     }
//                 },
//                 "field": "vlmVisitItemLinks",
//                 "exportable": false
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "681",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/0/vlmVisitItemLinks",
//             "type": {
//                 "model": {
//                     "params": [
//                         {
//                             "enabled": true,
//                             "visible": true,
//                             "activeValidationGroups": [],
//                             "collectionParams": [],
//                             "configId": "683",
//                             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/0/vlmVisitItemLinks/petQuestionnaire",
//                             "type": {
//                                 "nested": false,
//                                 "name": "string",
//                                 "collection": false
//                             },
//                             "message": [],
//                             "values": [],
//                             "labels": [
//                                 {
//                                     "locale": "en-US",
//                                     "text": "Pet Questionnaire"
//                                 }
//                             ],
//                             "elemLabels": {}
//                         },
//                         {
//                             "enabled": true,
//                             "visible": true,
//                             "activeValidationGroups": [],
//                             "collectionParams": [],
//                             "configId": "684",
//                             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/0/vlmVisitItemLinks/petCareQuestionnaire",
//                             "type": {
//                                 "nested": false,
//                                 "name": "string",
//                                 "collection": false
//                             },
//                             "message": [],
//                             "values": [],
//                             "labels": [
//                                 {
//                                     "locale": "en-US",
//                                     "text": "Pet Care Questionnaire"
//                                 }
//                             ],
//                             "elemLabels": {}
//                         }
//                     ]
//                 }
//             },
//             "message": [],
//             "values": [],
//             "labels": [],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "685",
//                 "code": "expandedRowContent1",
//                 "validations": null,
//                 "uiNatures": [],
//                 "uiStyles": {
//                     "isLink": false,
//                     "isHidden": false,
//                     "name": "ViewConfig.GridRowBody",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": false,
//                         "cssClass": "",
//                         "asynchronous": false,
//                         "alias": "GridRowBody"
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": true,
//                     "name": "VisitLineItem.ExpandedRowContent1",
//                     "model": {
//                         "paramConfigIds": [
//                             "691"
//                         ]
//                     }
//                 },
//                 "field": "expandedRowContent1",
//                 "exportable": false
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "685",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/0/expandedRowContent1",
//             "type": {
//                 "model": {
//                     "params": [
//                         {
//                             "enabled": true,
//                             "visible": true,
//                             "activeValidationGroups": [],
//                             "collectionParams": [],
//                             "configId": "691",
//                             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/0/expandedRowContent1/pets",
//                             "type": {
//                                 "model": {
//                                     "params": []
//                                 }
//                             },
//                             "page": {
//                                 "last": true,
//                                 "totalPages": 1,
//                                 "totalElements": 0,
//                                 "size": 0,
//                                 "number": 0,
//                                 "first": true,
//                                 "numberOfElements": 0
//                             },
//                             "gridData": {
//                                 "collectionParams": []
//                             },
//                             "message": [],
//                             "values": [],
//                             "labels": [
//                                 {
//                                     "locale": "en-US",
//                                     "text": "Pets"
//                                 }
//                             ],
//                             "elemLabels": {}
//                         }
//                     ]
//                 }
//             },
//             "message": [],
//             "values": [],
//             "labels": [],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "678",
//                 "code": "status",
//                 "validations": null,
//                 "uiNatures": [],
//                 "uiStyles": {
//                     "isLink": true,
//                     "isHidden": false,
//                     "name": "ViewConfig.GridColumn",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": true,
//                         "rowExpander": false,
//                         "expandable": true,
//                         "applyValueStyles": false,
//                         "sortable": true,
//                         "filter": true,
//                         "filterMode": "equals",
//                         "cssClass": "",
//                         "filterValue": "",
//                         "datePattern": "",
//                         "alias": "GridColumn",
//                         "placeholder": "",
//                         "sortAs": "DEFAULT"
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": false,
//                     "name": "string"
//                 },
//                 "label": "Status",
//                 "field": "status",
//                 "header": "Status",
//                 "exportable": true
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "678",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/1/status",
//             "type": {
//                 "nested": false,
//                 "name": "string",
//                 "collection": false
//             },
//             "leafState": "Cancelled",
//             "previousLeafState": "Cancelled",
//             "message": [],
//             "values": [],
//             "labels": [
//                 {
//                     "locale": "en-US",
//                     "text": "Status"
//                 }
//             ],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "679",
//                 "code": "showHistory",
//                 "validations": null,
//                 "uiStyles": {
//                     "isLink": false,
//                     "isHidden": false,
//                     "name": "ViewConfig.Button",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": false,
//                         "b": "$execute",
//                         "method": "GET",
//                         "formReset": true,
//                         "type": "button",
//                         "title": "",
//                         "url": "",
//                         "printPath": "",
//                         "cssClass": "text-sm-right",
//                         "payload": "",
//                         "alias": "Button",
//                         "style": "PLAIN",
//                         "imgSrc": "",
//                         "imgType": "FA"
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": false,
//                     "name": "string"
//                 },
//                 "uiNatures": [
//                     {
//                         "name": "ViewConfig.Hints",
//                         "attributes": {
//                             "hidden": false,
//                             "readOnly": false,
//                             "submitButton": true,
//                             "showName": true,
//                             "pageSize": 25,
//                             "browserBack": false,
//                             "showAsLink": false,
//                             "value": "Right"
//                         }
//                     }
//                 ],
//                 "label": "testsing btn in table",
//                 "field": "showHistory",
//                 "header": "testsing btn in table",
//                 "exportable": false
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "679",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/1/showHistory",
//             "type": {
//                 "nested": false,
//                 "name": "string",
//                 "collection": false
//             },
//             "message": [],
//             "values": [],
//             "labels": [
//                 {
//                     "locale": "en-US",
//                     "text": "testsing btn in table"
//                 }
//             ],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "680",
//                 "code": "petQuestionnaire",
//                 "validations": null,
//                 "uiNatures": [],
//                 "uiStyles": {
//                     "isLink": true,
//                     "isHidden": false,
//                     "name": "ViewConfig.Link",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": false,
//                         "b": "$executeAnd$nav",
//                         "method": "GET",
//                         "cssClass": "",
//                         "altText": "",
//                         "rel": "",
//                         "alias": "Link",
//                         "value": "DEFAULT",
//                         "imgSrc": "edit.png",
//                         "url": "",
//                         "target": ""
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": false,
//                     "name": "string"
//                 },
//                 "label": "Pet Questionnaire",
//                 "field": "petQuestionnaire",
//                 "header": "Pet Questionnaire",
//                 "exportable": false
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "680",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/1/petQuestionnaire",
//             "type": {
//                 "nested": false,
//                 "name": "string",
//                 "collection": false
//             },
//             "message": [],
//             "values": [],
//             "labels": [
//                 {
//                     "locale": "en-US",
//                     "text": "Pet Questionnaire"
//                 }
//             ],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "681",
//                 "code": "vlmVisitItemLinks",
//                 "validations": null,
//                 "uiNatures": [],
//                 "uiStyles": {
//                     "isLink": true,
//                     "isHidden": false,
//                     "name": "ViewConfig.LinkMenu",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": false,
//                         "cssClass": "dropdownTrigger",
//                         "alias": "LinkMenu",
//                         "imgSrc": "",
//                         "imgType": "FA"
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": true,
//                     "name": "VisitLineItem.VLMVisitItemLinks",
//                     "model": {
//                         "paramConfigIds": [
//                             "683",
//                             "684"
//                         ]
//                     }
//                 },
//                 "field": "vlmVisitItemLinks",
//                 "exportable": false
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "681",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/1/vlmVisitItemLinks",
//             "type": {
//                 "model": {
//                     "params": [
//                         {
//                             "enabled": true,
//                             "visible": true,
//                             "activeValidationGroups": [],
//                             "collectionParams": [],
//                             "configId": "683",
//                             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/1/vlmVisitItemLinks/petQuestionnaire",
//                             "type": {
//                                 "nested": false,
//                                 "name": "string",
//                                 "collection": false
//                             },
//                             "message": [],
//                             "values": [],
//                             "labels": [
//                                 {
//                                     "locale": "en-US",
//                                     "text": "Pet Questionnaire"
//                                 }
//                             ],
//                             "elemLabels": {}
//                         },
//                         {
//                             "enabled": true,
//                             "visible": true,
//                             "activeValidationGroups": [],
//                             "collectionParams": [],
//                             "configId": "684",
//                             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/1/vlmVisitItemLinks/petCareQuestionnaire",
//                             "type": {
//                                 "nested": false,
//                                 "name": "string",
//                                 "collection": false
//                             },
//                             "message": [],
//                             "values": [],
//                             "labels": [
//                                 {
//                                     "locale": "en-US",
//                                     "text": "Pet Care Questionnaire"
//                                 }
//                             ],
//                             "elemLabels": {}
//                         }
//                     ]
//                 }
//             },
//             "message": [],
//             "values": [],
//             "labels": [],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "685",
//                 "code": "expandedRowContent1",
//                 "validations": null,
//                 "uiNatures": [],
//                 "uiStyles": {
//                     "isLink": false,
//                     "isHidden": false,
//                     "name": "ViewConfig.GridRowBody",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": false,
//                         "cssClass": "",
//                         "asynchronous": false,
//                         "alias": "GridRowBody"
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": true,
//                     "name": "VisitLineItem.ExpandedRowContent1",
//                     "model": {
//                         "paramConfigIds": [
//                             "691"
//                         ]
//                     }
//                 },
//                 "field": "expandedRowContent1",
//                 "exportable": false
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "685",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/1/expandedRowContent1",
//             "type": {
//                 "model": {
//                     "params": [
//                         {
//                             "enabled": true,
//                             "visible": true,
//                             "activeValidationGroups": [],
//                             "collectionParams": [],
//                             "configId": "691",
//                             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/1/expandedRowContent1/pets",
//                             "type": {
//                                 "model": {
//                                     "params": []
//                                 }
//                             },
//                             "page": {
//                                 "last": true,
//                                 "totalPages": 1,
//                                 "totalElements": 0,
//                                 "size": 0,
//                                 "number": 0,
//                                 "first": true,
//                                 "numberOfElements": 0
//                             },
//                             "gridData": {
//                                 "collectionParams": []
//                             },
//                             "message": [],
//                             "values": [],
//                             "labels": [
//                                 {
//                                     "locale": "en-US",
//                                     "text": "Pets"
//                                 }
//                             ],
//                             "elemLabels": {}
//                         }
//                     ]
//                 }
//             },
//             "message": [],
//             "values": [],
//             "labels": [],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "678",
//                 "code": "status",
//                 "validations": null,
//                 "uiNatures": [],
//                 "uiStyles": {
//                     "isLink": true,
//                     "isHidden": false,
//                     "name": "ViewConfig.GridColumn",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": true,
//                         "rowExpander": false,
//                         "expandable": true,
//                         "applyValueStyles": false,
//                         "sortable": true,
//                         "filter": true,
//                         "filterMode": "equals",
//                         "cssClass": "",
//                         "filterValue": "",
//                         "datePattern": "",
//                         "alias": "GridColumn",
//                         "placeholder": "",
//                         "sortAs": "DEFAULT"
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": false,
//                     "name": "string"
//                 },
//                 "label": "Status",
//                 "field": "status",
//                 "header": "Status",
//                 "exportable": true
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "678",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/2/status",
//             "type": {
//                 "nested": false,
//                 "name": "string",
//                 "collection": false
//             },
//             "leafState": "Cancelled",
//             "previousLeafState": "Cancelled",
//             "message": [],
//             "values": [],
//             "labels": [
//                 {
//                     "locale": "en-US",
//                     "text": "Status"
//                 }
//             ],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "679",
//                 "code": "showHistory",
//                 "validations": null,
//                 "uiStyles": {
//                     "isLink": false,
//                     "isHidden": false,
//                     "name": "ViewConfig.Button",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": false,
//                         "b": "$execute",
//                         "method": "GET",
//                         "formReset": true,
//                         "type": "button",
//                         "title": "",
//                         "url": "",
//                         "printPath": "",
//                         "cssClass": "text-sm-right",
//                         "payload": "",
//                         "alias": "Button",
//                         "style": "PLAIN",
//                         "imgSrc": "",
//                         "imgType": "FA"
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": false,
//                     "name": "string"
//                 },
//                 "uiNatures": [
//                     {
//                         "name": "ViewConfig.Hints",
//                         "attributes": {
//                             "hidden": false,
//                             "readOnly": false,
//                             "submitButton": true,
//                             "showName": true,
//                             "pageSize": 25,
//                             "browserBack": false,
//                             "showAsLink": false,
//                             "value": "Right"
//                         }
//                     }
//                 ],
//                 "label": "testsing btn in table",
//                 "field": "showHistory",
//                 "header": "testsing btn in table",
//                 "exportable": false
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "679",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/2/showHistory",
//             "type": {
//                 "nested": false,
//                 "name": "string",
//                 "collection": false
//             },
//             "message": [],
//             "values": [],
//             "labels": [
//                 {
//                     "locale": "en-US",
//                     "text": "testsing btn in table"
//                 }
//             ],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "680",
//                 "code": "petQuestionnaire",
//                 "validations": null,
//                 "uiNatures": [],
//                 "uiStyles": {
//                     "isLink": true,
//                     "isHidden": false,
//                     "name": "ViewConfig.Link",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": false,
//                         "b": "$executeAnd$nav",
//                         "method": "GET",
//                         "cssClass": "",
//                         "altText": "",
//                         "rel": "",
//                         "alias": "Link",
//                         "value": "DEFAULT",
//                         "imgSrc": "edit.png",
//                         "url": "",
//                         "target": ""
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": false,
//                     "name": "string"
//                 },
//                 "label": "Pet Questionnaire",
//                 "field": "petQuestionnaire",
//                 "header": "Pet Questionnaire",
//                 "exportable": false
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "680",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/2/petQuestionnaire",
//             "type": {
//                 "nested": false,
//                 "name": "string",
//                 "collection": false
//             },
//             "message": [],
//             "values": [],
//             "labels": [
//                 {
//                     "locale": "en-US",
//                     "text": "Pet Questionnaire"
//                 }
//             ],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "681",
//                 "code": "vlmVisitItemLinks",
//                 "validations": null,
//                 "uiNatures": [],
//                 "uiStyles": {
//                     "isLink": true,
//                     "isHidden": false,
//                     "name": "ViewConfig.LinkMenu",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": false,
//                         "cssClass": "dropdownTrigger",
//                         "alias": "LinkMenu",
//                         "imgSrc": "",
//                         "imgType": "FA"
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": true,
//                     "name": "VisitLineItem.VLMVisitItemLinks",
//                     "model": {
//                         "paramConfigIds": [
//                             "683",
//                             "684"
//                         ]
//                     }
//                 },
//                 "field": "vlmVisitItemLinks",
//                 "exportable": false
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "681",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/2/vlmVisitItemLinks",
//             "type": {
//                 "model": {
//                     "params": [
//                         {
//                             "enabled": true,
//                             "visible": true,
//                             "activeValidationGroups": [],
//                             "collectionParams": [],
//                             "configId": "683",
//                             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/2/vlmVisitItemLinks/petQuestionnaire",
//                             "type": {
//                                 "nested": false,
//                                 "name": "string",
//                                 "collection": false
//                             },
//                             "message": [],
//                             "values": [],
//                             "labels": [
//                                 {
//                                     "locale": "en-US",
//                                     "text": "Pet Questionnaire"
//                                 }
//                             ],
//                             "elemLabels": {}
//                         },
//                         {
//                             "enabled": true,
//                             "visible": true,
//                             "activeValidationGroups": [],
//                             "collectionParams": [],
//                             "configId": "684",
//                             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/2/vlmVisitItemLinks/petCareQuestionnaire",
//                             "type": {
//                                 "nested": false,
//                                 "name": "string",
//                                 "collection": false
//                             },
//                             "message": [],
//                             "values": [],
//                             "labels": [
//                                 {
//                                     "locale": "en-US",
//                                     "text": "Pet Care Questionnaire"
//                                 }
//                             ],
//                             "elemLabels": {}
//                         }
//                     ]
//                 }
//             },
//             "message": [],
//             "values": [],
//             "labels": [],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "685",
//                 "code": "expandedRowContent1",
//                 "validations": null,
//                 "uiNatures": [],
//                 "uiStyles": {
//                     "isLink": false,
//                     "isHidden": false,
//                     "name": "ViewConfig.GridRowBody",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": false,
//                         "cssClass": "",
//                         "asynchronous": false,
//                         "alias": "GridRowBody"
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": true,
//                     "name": "VisitLineItem.ExpandedRowContent1",
//                     "model": {
//                         "paramConfigIds": [
//                             "691"
//                         ]
//                     }
//                 },
//                 "field": "expandedRowContent1",
//                 "exportable": false
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "685",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/2/expandedRowContent1",
//             "type": {
//                 "model": {
//                     "params": [
//                         {
//                             "enabled": true,
//                             "visible": true,
//                             "activeValidationGroups": [],
//                             "collectionParams": [],
//                             "configId": "691",
//                             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/2/expandedRowContent1/pets",
//                             "type": {
//                                 "model": {
//                                     "params": []
//                                 }
//                             },
//                             "page": {
//                                 "last": true,
//                                 "totalPages": 1,
//                                 "totalElements": 0,
//                                 "size": 0,
//                                 "number": 0,
//                                 "first": true,
//                                 "numberOfElements": 0
//                             },
//                             "gridData": {
//                                 "collectionParams": []
//                             },
//                             "message": [],
//                             "values": [],
//                             "labels": [
//                                 {
//                                     "locale": "en-US",
//                                     "text": "Pets"
//                                 }
//                             ],
//                             "elemLabels": {}
//                         }
//                     ]
//                 }
//             },
//             "message": [],
//             "values": [],
//             "labels": [],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "678",
//                 "code": "status",
//                 "validations": null,
//                 "uiNatures": [],
//                 "uiStyles": {
//                     "isLink": true,
//                     "isHidden": false,
//                     "name": "ViewConfig.GridColumn",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": true,
//                         "rowExpander": false,
//                         "expandable": true,
//                         "applyValueStyles": false,
//                         "sortable": true,
//                         "filter": true,
//                         "filterMode": "equals",
//                         "cssClass": "",
//                         "filterValue": "",
//                         "datePattern": "",
//                         "alias": "GridColumn",
//                         "placeholder": "",
//                         "sortAs": "DEFAULT"
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": false,
//                     "name": "string"
//                 },
//                 "label": "Status",
//                 "field": "status",
//                 "header": "Status",
//                 "exportable": true
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "678",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/3/status",
//             "type": {
//                 "nested": false,
//                 "name": "string",
//                 "collection": false
//             },
//             "leafState": "Cancelled",
//             "previousLeafState": "Cancelled",
//             "message": [],
//             "values": [],
//             "labels": [
//                 {
//                     "locale": "en-US",
//                     "text": "Status"
//                 }
//             ],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "679",
//                 "code": "showHistory",
//                 "validations": null,
//                 "uiStyles": {
//                     "isLink": false,
//                     "isHidden": false,
//                     "name": "ViewConfig.Button",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": false,
//                         "b": "$execute",
//                         "method": "GET",
//                         "formReset": true,
//                         "type": "button",
//                         "title": "",
//                         "url": "",
//                         "printPath": "",
//                         "cssClass": "text-sm-right",
//                         "payload": "",
//                         "alias": "Button",
//                         "style": "PLAIN",
//                         "imgSrc": "",
//                         "imgType": "FA"
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": false,
//                     "name": "string"
//                 },
//                 "uiNatures": [
//                     {
//                         "name": "ViewConfig.Hints",
//                         "attributes": {
//                             "hidden": false,
//                             "readOnly": false,
//                             "submitButton": true,
//                             "showName": true,
//                             "pageSize": 25,
//                             "browserBack": false,
//                             "showAsLink": false,
//                             "value": "Right"
//                         }
//                     }
//                 ],
//                 "label": "testsing btn in table",
//                 "field": "showHistory",
//                 "header": "testsing btn in table",
//                 "exportable": false
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "679",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/3/showHistory",
//             "type": {
//                 "nested": false,
//                 "name": "string",
//                 "collection": false
//             },
//             "message": [],
//             "values": [],
//             "labels": [
//                 {
//                     "locale": "en-US",
//                     "text": "testsing btn in table"
//                 }
//             ],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "680",
//                 "code": "petQuestionnaire",
//                 "validations": null,
//                 "uiNatures": [],
//                 "uiStyles": {
//                     "isLink": true,
//                     "isHidden": false,
//                     "name": "ViewConfig.Link",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": false,
//                         "b": "$executeAnd$nav",
//                         "method": "GET",
//                         "cssClass": "",
//                         "altText": "",
//                         "rel": "",
//                         "alias": "Link",
//                         "value": "DEFAULT",
//                         "imgSrc": "edit.png",
//                         "url": "",
//                         "target": ""
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": false,
//                     "name": "string"
//                 },
//                 "label": "Pet Questionnaire",
//                 "field": "petQuestionnaire",
//                 "header": "Pet Questionnaire",
//                 "exportable": false
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "680",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/3/petQuestionnaire",
//             "type": {
//                 "nested": false,
//                 "name": "string",
//                 "collection": false
//             },
//             "message": [],
//             "values": [],
//             "labels": [
//                 {
//                     "locale": "en-US",
//                     "text": "Pet Questionnaire"
//                 }
//             ],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "681",
//                 "code": "vlmVisitItemLinks",
//                 "validations": null,
//                 "uiNatures": [],
//                 "uiStyles": {
//                     "isLink": true,
//                     "isHidden": false,
//                     "name": "ViewConfig.LinkMenu",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": false,
//                         "cssClass": "dropdownTrigger",
//                         "alias": "LinkMenu",
//                         "imgSrc": "",
//                         "imgType": "FA"
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": true,
//                     "name": "VisitLineItem.VLMVisitItemLinks",
//                     "model": {
//                         "paramConfigIds": [
//                             "683",
//                             "684"
//                         ]
//                     }
//                 },
//                 "field": "vlmVisitItemLinks",
//                 "exportable": false
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "681",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/3/vlmVisitItemLinks",
//             "type": {
//                 "model": {
//                     "params": [
//                         {
//                             "enabled": true,
//                             "visible": true,
//                             "activeValidationGroups": [],
//                             "collectionParams": [],
//                             "configId": "683",
//                             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/3/vlmVisitItemLinks/petQuestionnaire",
//                             "type": {
//                                 "nested": false,
//                                 "name": "string",
//                                 "collection": false
//                             },
//                             "message": [],
//                             "values": [],
//                             "labels": [
//                                 {
//                                     "locale": "en-US",
//                                     "text": "Pet Questionnaire"
//                                 }
//                             ],
//                             "elemLabels": {}
//                         },
//                         {
//                             "enabled": true,
//                             "visible": true,
//                             "activeValidationGroups": [],
//                             "collectionParams": [],
//                             "configId": "684",
//                             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/3/vlmVisitItemLinks/petCareQuestionnaire",
//                             "type": {
//                                 "nested": false,
//                                 "name": "string",
//                                 "collection": false
//                             },
//                             "message": [],
//                             "values": [],
//                             "labels": [
//                                 {
//                                     "locale": "en-US",
//                                     "text": "Pet Care Questionnaire"
//                                 }
//                             ],
//                             "elemLabels": {}
//                         }
//                     ]
//                 }
//             },
//             "message": [],
//             "values": [],
//             "labels": [],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "685",
//                 "code": "expandedRowContent1",
//                 "validations": null,
//                 "uiNatures": [],
//                 "uiStyles": {
//                     "isLink": false,
//                     "isHidden": false,
//                     "name": "ViewConfig.GridRowBody",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": false,
//                         "cssClass": "",
//                         "asynchronous": false,
//                         "alias": "GridRowBody"
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": true,
//                     "name": "VisitLineItem.ExpandedRowContent1",
//                     "model": {
//                         "paramConfigIds": [
//                             "691"
//                         ]
//                     }
//                 },
//                 "field": "expandedRowContent1",
//                 "exportable": false
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "685",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/3/expandedRowContent1",
//             "type": {
//                 "model": {
//                     "params": [
//                         {
//                             "enabled": true,
//                             "visible": true,
//                             "activeValidationGroups": [],
//                             "collectionParams": [],
//                             "configId": "691",
//                             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/3/expandedRowContent1/pets",
//                             "type": {
//                                 "model": {
//                                     "params": []
//                                 }
//                             },
//                             "page": {
//                                 "last": true,
//                                 "totalPages": 1,
//                                 "totalElements": 0,
//                                 "size": 0,
//                                 "number": 0,
//                                 "first": true,
//                                 "numberOfElements": 0
//                             },
//                             "gridData": {
//                                 "collectionParams": []
//                             },
//                             "message": [],
//                             "values": [],
//                             "labels": [
//                                 {
//                                     "locale": "en-US",
//                                     "text": "Pets"
//                                 }
//                             ],
//                             "elemLabels": {}
//                         }
//                     ]
//                 }
//             },
//             "message": [],
//             "values": [],
//             "labels": [],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "678",
//                 "code": "status",
//                 "validations": null,
//                 "uiNatures": [],
//                 "uiStyles": {
//                     "isLink": true,
//                     "isHidden": false,
//                     "name": "ViewConfig.GridColumn",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": true,
//                         "rowExpander": false,
//                         "expandable": true,
//                         "applyValueStyles": false,
//                         "sortable": true,
//                         "filter": true,
//                         "filterMode": "equals",
//                         "cssClass": "",
//                         "filterValue": "",
//                         "datePattern": "",
//                         "alias": "GridColumn",
//                         "placeholder": "",
//                         "sortAs": "DEFAULT"
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": false,
//                     "name": "string"
//                 },
//                 "label": "Status",
//                 "field": "status",
//                 "header": "Status",
//                 "exportable": true
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "678",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/4/status",
//             "type": {
//                 "nested": false,
//                 "name": "string",
//                 "collection": false
//             },
//             "message": [],
//             "values": [],
//             "labels": [
//                 {
//                     "locale": "en-US",
//                     "text": "Status"
//                 }
//             ],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "679",
//                 "code": "showHistory",
//                 "validations": null,
//                 "uiStyles": {
//                     "isLink": false,
//                     "isHidden": false,
//                     "name": "ViewConfig.Button",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": false,
//                         "b": "$execute",
//                         "method": "GET",
//                         "formReset": true,
//                         "type": "button",
//                         "title": "",
//                         "url": "",
//                         "printPath": "",
//                         "cssClass": "text-sm-right",
//                         "payload": "",
//                         "alias": "Button",
//                         "style": "PLAIN",
//                         "imgSrc": "",
//                         "imgType": "FA"
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": false,
//                     "name": "string"
//                 },
//                 "uiNatures": [
//                     {
//                         "name": "ViewConfig.Hints",
//                         "attributes": {
//                             "hidden": false,
//                             "readOnly": false,
//                             "submitButton": true,
//                             "showName": true,
//                             "pageSize": 25,
//                             "browserBack": false,
//                             "showAsLink": false,
//                             "value": "Right"
//                         }
//                     }
//                 ],
//                 "label": "testsing btn in table",
//                 "field": "showHistory",
//                 "header": "testsing btn in table",
//                 "exportable": false
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "679",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/4/showHistory",
//             "type": {
//                 "nested": false,
//                 "name": "string",
//                 "collection": false
//             },
//             "message": [],
//             "values": [],
//             "labels": [
//                 {
//                     "locale": "en-US",
//                     "text": "testsing btn in table"
//                 }
//             ],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "680",
//                 "code": "petQuestionnaire",
//                 "validations": null,
//                 "uiNatures": [],
//                 "uiStyles": {
//                     "isLink": true,
//                     "isHidden": false,
//                     "name": "ViewConfig.Link",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": false,
//                         "b": "$executeAnd$nav",
//                         "method": "GET",
//                         "cssClass": "",
//                         "altText": "",
//                         "rel": "",
//                         "alias": "Link",
//                         "value": "DEFAULT",
//                         "imgSrc": "edit.png",
//                         "url": "",
//                         "target": ""
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": false,
//                     "name": "string"
//                 },
//                 "label": "Pet Questionnaire",
//                 "field": "petQuestionnaire",
//                 "header": "Pet Questionnaire",
//                 "exportable": false
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "680",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/4/petQuestionnaire",
//             "type": {
//                 "nested": false,
//                 "name": "string",
//                 "collection": false
//             },
//             "message": [],
//             "values": [],
//             "labels": [
//                 {
//                     "locale": "en-US",
//                     "text": "Pet Questionnaire"
//                 }
//             ],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "681",
//                 "code": "vlmVisitItemLinks",
//                 "validations": null,
//                 "uiNatures": [],
//                 "uiStyles": {
//                     "isLink": true,
//                     "isHidden": false,
//                     "name": "ViewConfig.LinkMenu",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": false,
//                         "cssClass": "dropdownTrigger",
//                         "alias": "LinkMenu",
//                         "imgSrc": "",
//                         "imgType": "FA"
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": true,
//                     "name": "VisitLineItem.VLMVisitItemLinks",
//                     "model": {
//                         "paramConfigIds": [
//                             "683",
//                             "684"
//                         ]
//                     }
//                 },
//                 "field": "vlmVisitItemLinks",
//                 "exportable": false
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "681",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/4/vlmVisitItemLinks",
//             "type": {
//                 "model": {
//                     "params": [
//                         {
//                             "enabled": true,
//                             "visible": true,
//                             "activeValidationGroups": [],
//                             "collectionParams": [],
//                             "configId": "683",
//                             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/4/vlmVisitItemLinks/petQuestionnaire",
//                             "type": {
//                                 "nested": false,
//                                 "name": "string",
//                                 "collection": false
//                             },
//                             "message": [],
//                             "values": [],
//                             "labels": [
//                                 {
//                                     "locale": "en-US",
//                                     "text": "Pet Questionnaire"
//                                 }
//                             ],
//                             "elemLabels": {}
//                         },
//                         {
//                             "enabled": true,
//                             "visible": true,
//                             "activeValidationGroups": [],
//                             "collectionParams": [],
//                             "configId": "684",
//                             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/4/vlmVisitItemLinks/petCareQuestionnaire",
//                             "type": {
//                                 "nested": false,
//                                 "name": "string",
//                                 "collection": false
//                             },
//                             "message": [],
//                             "values": [],
//                             "labels": [
//                                 {
//                                     "locale": "en-US",
//                                     "text": "Pet Care Questionnaire"
//                                 }
//                             ],
//                             "elemLabels": {}
//                         }
//                     ]
//                 }
//             },
//             "message": [],
//             "values": [],
//             "labels": [],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "685",
//                 "code": "expandedRowContent1",
//                 "validations": null,
//                 "uiNatures": [],
//                 "uiStyles": {
//                     "isLink": false,
//                     "isHidden": false,
//                     "name": "ViewConfig.GridRowBody",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": false,
//                         "cssClass": "",
//                         "asynchronous": false,
//                         "alias": "GridRowBody"
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": true,
//                     "name": "VisitLineItem.ExpandedRowContent1",
//                     "model": {
//                         "paramConfigIds": [
//                             "691"
//                         ]
//                     }
//                 },
//                 "field": "expandedRowContent1",
//                 "exportable": false
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "685",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/4/expandedRowContent1",
//             "type": {
//                 "model": {
//                     "params": [
//                         {
//                             "enabled": true,
//                             "visible": true,
//                             "activeValidationGroups": [],
//                             "collectionParams": [],
//                             "configId": "691",
//                             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/4/expandedRowContent1/pets",
//                             "type": {
//                                 "model": {
//                                     "params": []
//                                 }
//                             },
//                             "page": {
//                                 "last": true,
//                                 "totalPages": 1,
//                                 "totalElements": 0,
//                                 "size": 0,
//                                 "number": 0,
//                                 "first": true,
//                                 "numberOfElements": 0
//                             },
//                             "gridData": {
//                                 "collectionParams": []
//                             },
//                             "message": [],
//                             "values": [],
//                             "labels": [
//                                 {
//                                     "locale": "en-US",
//                                     "text": "Pets"
//                                 }
//                             ],
//                             "elemLabels": {}
//                         }
//                     ]
//                 }
//             },
//             "message": [],
//             "values": [],
//             "labels": [],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "678",
//                 "code": "status",
//                 "validations": null,
//                 "uiNatures": [],
//                 "uiStyles": {
//                     "isLink": true,
//                     "isHidden": false,
//                     "name": "ViewConfig.GridColumn",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": true,
//                         "rowExpander": false,
//                         "expandable": true,
//                         "applyValueStyles": false,
//                         "sortable": true,
//                         "filter": true,
//                         "filterMode": "equals",
//                         "cssClass": "",
//                         "filterValue": "",
//                         "datePattern": "",
//                         "alias": "GridColumn",
//                         "placeholder": "",
//                         "sortAs": "DEFAULT"
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": false,
//                     "name": "string"
//                 },
//                 "label": "Status",
//                 "field": "status",
//                 "header": "Status",
//                 "exportable": true
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "678",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/5/status",
//             "type": {
//                 "nested": false,
//                 "name": "string",
//                 "collection": false
//             },
//             "message": [],
//             "values": [],
//             "labels": [
//                 {
//                     "locale": "en-US",
//                     "text": "Status"
//                 }
//             ],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "679",
//                 "code": "showHistory",
//                 "validations": null,
//                 "uiStyles": {
//                     "isLink": false,
//                     "isHidden": false,
//                     "name": "ViewConfig.Button",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": false,
//                         "b": "$execute",
//                         "method": "GET",
//                         "formReset": true,
//                         "type": "button",
//                         "title": "",
//                         "url": "",
//                         "printPath": "",
//                         "cssClass": "text-sm-right",
//                         "payload": "",
//                         "alias": "Button",
//                         "style": "PLAIN",
//                         "imgSrc": "",
//                         "imgType": "FA"
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": false,
//                     "name": "string"
//                 },
//                 "uiNatures": [
//                     {
//                         "name": "ViewConfig.Hints",
//                         "attributes": {
//                             "hidden": false,
//                             "readOnly": false,
//                             "submitButton": true,
//                             "showName": true,
//                             "pageSize": 25,
//                             "browserBack": false,
//                             "showAsLink": false,
//                             "value": "Right"
//                         }
//                     }
//                 ],
//                 "label": "testsing btn in table",
//                 "field": "showHistory",
//                 "header": "testsing btn in table",
//                 "exportable": false
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "679",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/5/showHistory",
//             "type": {
//                 "nested": false,
//                 "name": "string",
//                 "collection": false
//             },
//             "message": [],
//             "values": [],
//             "labels": [
//                 {
//                     "locale": "en-US",
//                     "text": "testsing btn in table"
//                 }
//             ],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "680",
//                 "code": "petQuestionnaire",
//                 "validations": null,
//                 "uiNatures": [],
//                 "uiStyles": {
//                     "isLink": true,
//                     "isHidden": false,
//                     "name": "ViewConfig.Link",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": false,
//                         "b": "$executeAnd$nav",
//                         "method": "GET",
//                         "cssClass": "",
//                         "altText": "",
//                         "rel": "",
//                         "alias": "Link",
//                         "value": "DEFAULT",
//                         "imgSrc": "edit.png",
//                         "url": "",
//                         "target": ""
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": false,
//                     "name": "string"
//                 },
//                 "label": "Pet Questionnaire",
//                 "field": "petQuestionnaire",
//                 "header": "Pet Questionnaire",
//                 "exportable": false
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "680",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/5/petQuestionnaire",
//             "type": {
//                 "nested": false,
//                 "name": "string",
//                 "collection": false
//             },
//             "message": [],
//             "values": [],
//             "labels": [
//                 {
//                     "locale": "en-US",
//                     "text": "Pet Questionnaire"
//                 }
//             ],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "681",
//                 "code": "vlmVisitItemLinks",
//                 "validations": null,
//                 "uiNatures": [],
//                 "uiStyles": {
//                     "isLink": true,
//                     "isHidden": false,
//                     "name": "ViewConfig.LinkMenu",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": false,
//                         "cssClass": "dropdownTrigger",
//                         "alias": "LinkMenu",
//                         "imgSrc": "",
//                         "imgType": "FA"
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": true,
//                     "name": "VisitLineItem.VLMVisitItemLinks",
//                     "model": {
//                         "paramConfigIds": [
//                             "683",
//                             "684"
//                         ]
//                     }
//                 },
//                 "field": "vlmVisitItemLinks",
//                 "exportable": false
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "681",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/5/vlmVisitItemLinks",
//             "type": {
//                 "model": {
//                     "params": [
//                         {
//                             "enabled": true,
//                             "visible": true,
//                             "activeValidationGroups": [],
//                             "collectionParams": [],
//                             "configId": "683",
//                             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/5/vlmVisitItemLinks/petQuestionnaire",
//                             "type": {
//                                 "nested": false,
//                                 "name": "string",
//                                 "collection": false
//                             },
//                             "message": [],
//                             "values": [],
//                             "labels": [
//                                 {
//                                     "locale": "en-US",
//                                     "text": "Pet Questionnaire"
//                                 }
//                             ],
//                             "elemLabels": {}
//                         },
//                         {
//                             "enabled": true,
//                             "visible": true,
//                             "activeValidationGroups": [],
//                             "collectionParams": [],
//                             "configId": "684",
//                             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/5/vlmVisitItemLinks/petCareQuestionnaire",
//                             "type": {
//                                 "nested": false,
//                                 "name": "string",
//                                 "collection": false
//                             },
//                             "message": [],
//                             "values": [],
//                             "labels": [
//                                 {
//                                     "locale": "en-US",
//                                     "text": "Pet Care Questionnaire"
//                                 }
//                             ],
//                             "elemLabels": {}
//                         }
//                     ]
//                 }
//             },
//             "message": [],
//             "values": [],
//             "labels": [],
//             "elemLabels": {}
//         },
//         {
//             "config": {
//                 "active": false,
//                 "required": false,
//                 "id": "685",
//                 "code": "expandedRowContent1",
//                 "validations": null,
//                 "uiNatures": [],
//                 "uiStyles": {
//                     "isLink": false,
//                     "isHidden": false,
//                     "name": "ViewConfig.GridRowBody",
//                     "attributes": {
//                         "hidden": false,
//                         "readOnly": false,
//                         "submitButton": true,
//                         "showName": true,
//                         "pageSize": 25,
//                         "browserBack": false,
//                         "showAsLink": false,
//                         "cssClass": "",
//                         "asynchronous": false,
//                         "alias": "GridRowBody"
//                     }
//                 },
//                 "type": {
//                     "collection": false,
//                     "nested": true,
//                     "name": "VisitLineItem.ExpandedRowContent1",
//                     "model": {
//                         "paramConfigIds": [
//                             "691"
//                         ]
//                     }
//                 },
//                 "field": "expandedRowContent1",
//                 "exportable": false
//             },
//             "enabled": true,
//             "visible": true,
//             "activeValidationGroups": [],
//             "collectionParams": [],
//             "configId": "685",
//             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/5/expandedRowContent1",
//             "type": {
//                 "model": {
//                     "params": [
//                         {
//                             "enabled": true,
//                             "visible": true,
//                             "activeValidationGroups": [],
//                             "collectionParams": [],
//                             "configId": "691",
//                             "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/5/expandedRowContent1/pets",
//                             "type": {
//                                 "model": {
//                                     "params": []
//                                 }
//                             },
//                             "page": {
//                                 "last": true,
//                                 "totalPages": 1,
//                                 "totalElements": 0,
//                                 "size": 0,
//                                 "number": 0,
//                                 "first": true,
//                                 "numberOfElements": 0
//                             },
//                             "gridData": {
//                                 "collectionParams": []
//                             },
//                             "message": [],
//                             "values": [],
//                             "labels": [
//                                 {
//                                     "locale": "en-US",
//                                     "text": "Pets"
//                                 }
//                             ],
//                             "elemLabels": {}
//                         }
//                     ]
//                 }
//             },
//             "message": [],
//             "values": [],
//             "labels": [],
//             "elemLabels": {}
//         }
//     ],
//     "configId": "705",
//     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction",
//     "type": {
//         "model": {
//             "params": [
//                 {
//                     "enabled": true,
//                     "visible": true,
//                     "activeValidationGroups": [],
//                     "collectionParams": [],
//                     "configId": "708",
//                     "collectionElem": true,
//                     "elemId": "0",
//                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/0",
//                     "type": {
//                         "model": {
//                             "params": [
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "673",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/0/id",
//                                     "type": {},
//                                     "leafState": 1,
//                                     "previousLeafState": 1,
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "674",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/0/appointment",
//                                     "type": {},
//                                     "leafState": "2018-09-21T04:00:00.000Z",
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Appointment Date"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "675",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/0/ownerName",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "leafState": "test 1",
//                                     "previousLeafState": "test 1",
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Owner's name"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "676",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/0/petName",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "leafState": "test pet",
//                                     "previousLeafState": "test pet",
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Pet's name"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "677",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/0/reasonForVisit",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "leafState": "regular visit",
//                                     "previousLeafState": "regular visit",
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Reason For Visit"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "678",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/0/status",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "leafState": "",
//                                     "previousLeafState": "",
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Status"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "679",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/0/showHistory",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "testsing btn in table"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "680",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/0/petQuestionnaire",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Pet Questionnaire"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "681",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/0/vlmVisitItemLinks",
//                                     "type": {
//                                         "model": {
//                                             "params": [
//                                                 {
//                                                     "enabled": true,
//                                                     "visible": true,
//                                                     "activeValidationGroups": [],
//                                                     "collectionParams": [],
//                                                     "configId": "683",
//                                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/0/vlmVisitItemLinks/petQuestionnaire",
//                                                     "type": {
//                                                         "nested": false,
//                                                         "name": "string",
//                                                         "collection": false
//                                                     },
//                                                     "message": [],
//                                                     "values": [],
//                                                     "labels": [
//                                                         {
//                                                             "locale": "en-US",
//                                                             "text": "Pet Questionnaire"
//                                                         }
//                                                     ],
//                                                     "elemLabels": {}
//                                                 },
//                                                 {
//                                                     "enabled": true,
//                                                     "visible": true,
//                                                     "activeValidationGroups": [],
//                                                     "collectionParams": [],
//                                                     "configId": "684",
//                                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/0/vlmVisitItemLinks/petCareQuestionnaire",
//                                                     "type": {
//                                                         "nested": false,
//                                                         "name": "string",
//                                                         "collection": false
//                                                     },
//                                                     "message": [],
//                                                     "values": [],
//                                                     "labels": [
//                                                         {
//                                                             "locale": "en-US",
//                                                             "text": "Pet Care Questionnaire"
//                                                         }
//                                                     ],
//                                                     "elemLabels": {}
//                                                 }
//                                             ]
//                                         }
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "685",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/0/expandedRowContent1",
//                                     "type": {
//                                         "model": {
//                                             "params": [
//                                                 {
//                                                     "enabled": true,
//                                                     "visible": true,
//                                                     "activeValidationGroups": [],
//                                                     "collectionParams": [],
//                                                     "configId": "691",
//                                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/0/expandedRowContent1/pets",
//                                                     "type": {
//                                                         "model": {
//                                                             "params": []
//                                                         }
//                                                     },
//                                                     "page": {
//                                                         "last": true,
//                                                         "totalPages": 1,
//                                                         "totalElements": 0,
//                                                         "size": 0,
//                                                         "number": 0,
//                                                         "first": true,
//                                                         "numberOfElements": 0
//                                                     },
//                                                     "gridData": {
//                                                         "collectionParams": []
//                                                     },
//                                                     "message": [],
//                                                     "values": [],
//                                                     "labels": [
//                                                         {
//                                                             "locale": "en-US",
//                                                             "text": "Pets"
//                                                         }
//                                                     ],
//                                                     "elemLabels": {}
//                                                 }
//                                             ]
//                                         }
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [],
//                                     "elemLabels": {}
//                                 }
//                             ]
//                         }
//                     },
//                     "leafState": {
//                         "id": 1,
//                         "appointment": "2018-09-21T04:00:00.000Z",
//                         "ownerName": "test 1",
//                         "petName": "test pet",
//                         "reasonForVisit": "regular visit",
//                         "status": "",
//                         "vlmVisitItemLinks": {},
//                         "expandedRowContent1": {
//                             "pets": []
//                         },
//                         "elemId": "0"
//                     },
//                     "previousLeafState": {
//                         "id": 1,
//                         "appointment": "2018-09-21T04:00:00.000Z",
//                         "ownerName": "test 1",
//                         "petName": "test pet",
//                         "reasonForVisit": "regular visit",
//                         "status": "",
//                         "vlmVisitItemLinks": {},
//                         "expandedRowContent1": {
//                             "pets": []
//                         },
//                         "elemId": "0"
//                     },
//                     "message": [],
//                     "values": [],
//                     "labels": [],
//                     "elemLabels": {}
//                 },
//                 {
//                     "enabled": true,
//                     "visible": true,
//                     "activeValidationGroups": [],
//                     "collectionParams": [],
//                     "configId": "708",
//                     "collectionElem": true,
//                     "elemId": "1",
//                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/1",
//                     "type": {
//                         "model": {
//                             "params": [
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "673",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/1/id",
//                                     "type": {},
//                                     "leafState": 2,
//                                     "previousLeafState": 2,
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "674",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/1/appointment",
//                                     "type": {},
//                                     "leafState": null,
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Appointment Date"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "675",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/1/ownerName",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "leafState": "null",
//                                     "previousLeafState": "null",
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Owner's name"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "676",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/1/petName",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "leafState": "cat",
//                                     "previousLeafState": "cat",
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Pet's name"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "677",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/1/reasonForVisit",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Reason For Visit"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "678",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/1/status",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "leafState": "Cancelled",
//                                     "previousLeafState": "Cancelled",
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Status"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "679",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/1/showHistory",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "testsing btn in table"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "680",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/1/petQuestionnaire",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Pet Questionnaire"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "681",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/1/vlmVisitItemLinks",
//                                     "type": {
//                                         "model": {
//                                             "params": [
//                                                 {
//                                                     "enabled": true,
//                                                     "visible": true,
//                                                     "activeValidationGroups": [],
//                                                     "collectionParams": [],
//                                                     "configId": "683",
//                                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/1/vlmVisitItemLinks/petQuestionnaire",
//                                                     "type": {
//                                                         "nested": false,
//                                                         "name": "string",
//                                                         "collection": false
//                                                     },
//                                                     "message": [],
//                                                     "values": [],
//                                                     "labels": [
//                                                         {
//                                                             "locale": "en-US",
//                                                             "text": "Pet Questionnaire"
//                                                         }
//                                                     ],
//                                                     "elemLabels": {}
//                                                 },
//                                                 {
//                                                     "enabled": true,
//                                                     "visible": true,
//                                                     "activeValidationGroups": [],
//                                                     "collectionParams": [],
//                                                     "configId": "684",
//                                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/1/vlmVisitItemLinks/petCareQuestionnaire",
//                                                     "type": {
//                                                         "nested": false,
//                                                         "name": "string",
//                                                         "collection": false
//                                                     },
//                                                     "message": [],
//                                                     "values": [],
//                                                     "labels": [
//                                                         {
//                                                             "locale": "en-US",
//                                                             "text": "Pet Care Questionnaire"
//                                                         }
//                                                     ],
//                                                     "elemLabels": {}
//                                                 }
//                                             ]
//                                         }
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "685",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/1/expandedRowContent1",
//                                     "type": {
//                                         "model": {
//                                             "params": [
//                                                 {
//                                                     "enabled": true,
//                                                     "visible": true,
//                                                     "activeValidationGroups": [],
//                                                     "collectionParams": [],
//                                                     "configId": "691",
//                                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/1/expandedRowContent1/pets",
//                                                     "type": {
//                                                         "model": {
//                                                             "params": []
//                                                         }
//                                                     },
//                                                     "page": {
//                                                         "last": true,
//                                                         "totalPages": 1,
//                                                         "totalElements": 0,
//                                                         "size": 0,
//                                                         "number": 0,
//                                                         "first": true,
//                                                         "numberOfElements": 0
//                                                     },
//                                                     "gridData": {
//                                                         "collectionParams": []
//                                                     },
//                                                     "message": [],
//                                                     "values": [],
//                                                     "labels": [
//                                                         {
//                                                             "locale": "en-US",
//                                                             "text": "Pets"
//                                                         }
//                                                     ],
//                                                     "elemLabels": {}
//                                                 }
//                                             ]
//                                         }
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [],
//                                     "elemLabels": {}
//                                 }
//                             ]
//                         }
//                     },
//                     "leafState": {
//                         "id": 2,
//                         "ownerName": "null",
//                         "petName": "cat",
//                         "status": "Cancelled",
//                         "vlmVisitItemLinks": {},
//                         "expandedRowContent1": {
//                             "pets": []
//                         },
//                         "elemId": "1",
//                         "appointment": null
//                     },
//                     "previousLeafState": {
//                         "id": 2,
//                         "ownerName": "null",
//                         "petName": "cat",
//                         "status": "Cancelled",
//                         "vlmVisitItemLinks": {},
//                         "expandedRowContent1": {
//                             "pets": []
//                         },
//                         "elemId": "1",
//                         "appointment": null
//                     },
//                     "message": [],
//                     "values": [],
//                     "labels": [],
//                     "elemLabels": {}
//                 },
//                 {
//                     "enabled": true,
//                     "visible": true,
//                     "activeValidationGroups": [],
//                     "collectionParams": [],
//                     "configId": "708",
//                     "collectionElem": true,
//                     "elemId": "2",
//                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/2",
//                     "type": {
//                         "model": {
//                             "params": [
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "673",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/2/id",
//                                     "type": {},
//                                     "leafState": 3,
//                                     "previousLeafState": 3,
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "674",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/2/appointment",
//                                     "type": {},
//                                     "leafState": null,
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Appointment Date"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "675",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/2/ownerName",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "leafState": "null",
//                                     "previousLeafState": "null",
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Owner's name"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "676",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/2/petName",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "leafState": "cat",
//                                     "previousLeafState": "cat",
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Pet's name"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "677",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/2/reasonForVisit",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Reason For Visit"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "678",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/2/status",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "leafState": "Cancelled",
//                                     "previousLeafState": "Cancelled",
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Status"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "679",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/2/showHistory",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "testsing btn in table"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "680",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/2/petQuestionnaire",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Pet Questionnaire"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "681",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/2/vlmVisitItemLinks",
//                                     "type": {
//                                         "model": {
//                                             "params": [
//                                                 {
//                                                     "enabled": true,
//                                                     "visible": true,
//                                                     "activeValidationGroups": [],
//                                                     "collectionParams": [],
//                                                     "configId": "683",
//                                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/2/vlmVisitItemLinks/petQuestionnaire",
//                                                     "type": {
//                                                         "nested": false,
//                                                         "name": "string",
//                                                         "collection": false
//                                                     },
//                                                     "message": [],
//                                                     "values": [],
//                                                     "labels": [
//                                                         {
//                                                             "locale": "en-US",
//                                                             "text": "Pet Questionnaire"
//                                                         }
//                                                     ],
//                                                     "elemLabels": {}
//                                                 },
//                                                 {
//                                                     "enabled": true,
//                                                     "visible": true,
//                                                     "activeValidationGroups": [],
//                                                     "collectionParams": [],
//                                                     "configId": "684",
//                                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/2/vlmVisitItemLinks/petCareQuestionnaire",
//                                                     "type": {
//                                                         "nested": false,
//                                                         "name": "string",
//                                                         "collection": false
//                                                     },
//                                                     "message": [],
//                                                     "values": [],
//                                                     "labels": [
//                                                         {
//                                                             "locale": "en-US",
//                                                             "text": "Pet Care Questionnaire"
//                                                         }
//                                                     ],
//                                                     "elemLabels": {}
//                                                 }
//                                             ]
//                                         }
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "685",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/2/expandedRowContent1",
//                                     "type": {
//                                         "model": {
//                                             "params": [
//                                                 {
//                                                     "enabled": true,
//                                                     "visible": true,
//                                                     "activeValidationGroups": [],
//                                                     "collectionParams": [],
//                                                     "configId": "691",
//                                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/2/expandedRowContent1/pets",
//                                                     "type": {
//                                                         "model": {
//                                                             "params": []
//                                                         }
//                                                     },
//                                                     "page": {
//                                                         "last": true,
//                                                         "totalPages": 1,
//                                                         "totalElements": 0,
//                                                         "size": 0,
//                                                         "number": 0,
//                                                         "first": true,
//                                                         "numberOfElements": 0
//                                                     },
//                                                     "gridData": {
//                                                         "collectionParams": []
//                                                     },
//                                                     "message": [],
//                                                     "values": [],
//                                                     "labels": [
//                                                         {
//                                                             "locale": "en-US",
//                                                             "text": "Pets"
//                                                         }
//                                                     ],
//                                                     "elemLabels": {}
//                                                 }
//                                             ]
//                                         }
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [],
//                                     "elemLabels": {}
//                                 }
//                             ]
//                         }
//                     },
//                     "leafState": {
//                         "id": 3,
//                         "ownerName": "null",
//                         "petName": "cat",
//                         "status": "Cancelled",
//                         "vlmVisitItemLinks": {},
//                         "expandedRowContent1": {
//                             "pets": []
//                         },
//                         "elemId": "2",
//                         "appointment": null
//                     },
//                     "previousLeafState": {
//                         "id": 3,
//                         "ownerName": "null",
//                         "petName": "cat",
//                         "status": "Cancelled",
//                         "vlmVisitItemLinks": {},
//                         "expandedRowContent1": {
//                             "pets": []
//                         },
//                         "elemId": "2",
//                         "appointment": null
//                     },
//                     "message": [],
//                     "values": [],
//                     "labels": [],
//                     "elemLabels": {}
//                 },
//                 {
//                     "enabled": true,
//                     "visible": true,
//                     "activeValidationGroups": [],
//                     "collectionParams": [],
//                     "configId": "708",
//                     "collectionElem": true,
//                     "elemId": "3",
//                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/3",
//                     "type": {
//                         "model": {
//                             "params": [
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "673",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/3/id",
//                                     "type": {},
//                                     "leafState": 4,
//                                     "previousLeafState": 4,
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "674",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/3/appointment",
//                                     "type": {},
//                                     "leafState": null,
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Appointment Date"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "675",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/3/ownerName",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "leafState": "null",
//                                     "previousLeafState": "null",
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Owner's name"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "676",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/3/petName",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "leafState": "cat",
//                                     "previousLeafState": "cat",
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Pet's name"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "677",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/3/reasonForVisit",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Reason For Visit"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "678",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/3/status",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "leafState": "Cancelled",
//                                     "previousLeafState": "Cancelled",
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Status"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "679",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/3/showHistory",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "testsing btn in table"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "680",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/3/petQuestionnaire",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Pet Questionnaire"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "681",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/3/vlmVisitItemLinks",
//                                     "type": {
//                                         "model": {
//                                             "params": [
//                                                 {
//                                                     "enabled": true,
//                                                     "visible": true,
//                                                     "activeValidationGroups": [],
//                                                     "collectionParams": [],
//                                                     "configId": "683",
//                                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/3/vlmVisitItemLinks/petQuestionnaire",
//                                                     "type": {
//                                                         "nested": false,
//                                                         "name": "string",
//                                                         "collection": false
//                                                     },
//                                                     "message": [],
//                                                     "values": [],
//                                                     "labels": [
//                                                         {
//                                                             "locale": "en-US",
//                                                             "text": "Pet Questionnaire"
//                                                         }
//                                                     ],
//                                                     "elemLabels": {}
//                                                 },
//                                                 {
//                                                     "enabled": true,
//                                                     "visible": true,
//                                                     "activeValidationGroups": [],
//                                                     "collectionParams": [],
//                                                     "configId": "684",
//                                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/3/vlmVisitItemLinks/petCareQuestionnaire",
//                                                     "type": {
//                                                         "nested": false,
//                                                         "name": "string",
//                                                         "collection": false
//                                                     },
//                                                     "message": [],
//                                                     "values": [],
//                                                     "labels": [
//                                                         {
//                                                             "locale": "en-US",
//                                                             "text": "Pet Care Questionnaire"
//                                                         }
//                                                     ],
//                                                     "elemLabels": {}
//                                                 }
//                                             ]
//                                         }
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "685",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/3/expandedRowContent1",
//                                     "type": {
//                                         "model": {
//                                             "params": [
//                                                 {
//                                                     "enabled": true,
//                                                     "visible": true,
//                                                     "activeValidationGroups": [],
//                                                     "collectionParams": [],
//                                                     "configId": "691",
//                                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/3/expandedRowContent1/pets",
//                                                     "type": {
//                                                         "model": {
//                                                             "params": []
//                                                         }
//                                                     },
//                                                     "page": {
//                                                         "last": true,
//                                                         "totalPages": 1,
//                                                         "totalElements": 0,
//                                                         "size": 0,
//                                                         "number": 0,
//                                                         "first": true,
//                                                         "numberOfElements": 0
//                                                     },
//                                                     "gridData": {
//                                                         "collectionParams": []
//                                                     },
//                                                     "message": [],
//                                                     "values": [],
//                                                     "labels": [
//                                                         {
//                                                             "locale": "en-US",
//                                                             "text": "Pets"
//                                                         }
//                                                     ],
//                                                     "elemLabels": {}
//                                                 }
//                                             ]
//                                         }
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [],
//                                     "elemLabels": {}
//                                 }
//                             ]
//                         }
//                     },
//                     "leafState": {
//                         "id": 4,
//                         "ownerName": "null",
//                         "petName": "cat",
//                         "status": "Cancelled",
//                         "vlmVisitItemLinks": {},
//                         "expandedRowContent1": {
//                             "pets": []
//                         },
//                         "elemId": "3",
//                         "appointment": null
//                     },
//                     "previousLeafState": {
//                         "id": 4,
//                         "ownerName": "null",
//                         "petName": "cat",
//                         "status": "Cancelled",
//                         "vlmVisitItemLinks": {},
//                         "expandedRowContent1": {
//                             "pets": []
//                         },
//                         "elemId": "3",
//                         "appointment": null
//                     },
//                     "message": [],
//                     "values": [],
//                     "labels": [],
//                     "elemLabels": {}
//                 },
//                 {
//                     "enabled": true,
//                     "visible": true,
//                     "activeValidationGroups": [],
//                     "collectionParams": [],
//                     "configId": "708",
//                     "collectionElem": true,
//                     "elemId": "4",
//                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/4",
//                     "type": {
//                         "model": {
//                             "params": [
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "673",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/4/id",
//                                     "type": {},
//                                     "leafState": 5,
//                                     "previousLeafState": 5,
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "674",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/4/appointment",
//                                     "type": {},
//                                     "leafState": null,
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Appointment Date"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "675",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/4/ownerName",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "leafState": "null",
//                                     "previousLeafState": "null",
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Owner's name"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "676",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/4/petName",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "leafState": "cat",
//                                     "previousLeafState": "cat",
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Pet's name"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "677",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/4/reasonForVisit",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Reason For Visit"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "678",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/4/status",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Status"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "679",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/4/showHistory",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "testsing btn in table"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "680",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/4/petQuestionnaire",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Pet Questionnaire"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "681",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/4/vlmVisitItemLinks",
//                                     "type": {
//                                         "model": {
//                                             "params": [
//                                                 {
//                                                     "enabled": true,
//                                                     "visible": true,
//                                                     "activeValidationGroups": [],
//                                                     "collectionParams": [],
//                                                     "configId": "683",
//                                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/4/vlmVisitItemLinks/petQuestionnaire",
//                                                     "type": {
//                                                         "nested": false,
//                                                         "name": "string",
//                                                         "collection": false
//                                                     },
//                                                     "message": [],
//                                                     "values": [],
//                                                     "labels": [
//                                                         {
//                                                             "locale": "en-US",
//                                                             "text": "Pet Questionnaire"
//                                                         }
//                                                     ],
//                                                     "elemLabels": {}
//                                                 },
//                                                 {
//                                                     "enabled": true,
//                                                     "visible": true,
//                                                     "activeValidationGroups": [],
//                                                     "collectionParams": [],
//                                                     "configId": "684",
//                                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/4/vlmVisitItemLinks/petCareQuestionnaire",
//                                                     "type": {
//                                                         "nested": false,
//                                                         "name": "string",
//                                                         "collection": false
//                                                     },
//                                                     "message": [],
//                                                     "values": [],
//                                                     "labels": [
//                                                         {
//                                                             "locale": "en-US",
//                                                             "text": "Pet Care Questionnaire"
//                                                         }
//                                                     ],
//                                                     "elemLabels": {}
//                                                 }
//                                             ]
//                                         }
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "685",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/4/expandedRowContent1",
//                                     "type": {
//                                         "model": {
//                                             "params": [
//                                                 {
//                                                     "enabled": true,
//                                                     "visible": true,
//                                                     "activeValidationGroups": [],
//                                                     "collectionParams": [],
//                                                     "configId": "691",
//                                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/4/expandedRowContent1/pets",
//                                                     "type": {
//                                                         "model": {
//                                                             "params": []
//                                                         }
//                                                     },
//                                                     "page": {
//                                                         "last": true,
//                                                         "totalPages": 1,
//                                                         "totalElements": 0,
//                                                         "size": 0,
//                                                         "number": 0,
//                                                         "first": true,
//                                                         "numberOfElements": 0
//                                                     },
//                                                     "gridData": {
//                                                         "collectionParams": []
//                                                     },
//                                                     "message": [],
//                                                     "values": [],
//                                                     "labels": [
//                                                         {
//                                                             "locale": "en-US",
//                                                             "text": "Pets"
//                                                         }
//                                                     ],
//                                                     "elemLabels": {}
//                                                 }
//                                             ]
//                                         }
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [],
//                                     "elemLabels": {}
//                                 }
//                             ]
//                         }
//                     },
//                     "leafState": {
//                         "id": 5,
//                         "ownerName": "null",
//                         "petName": "cat",
//                         "vlmVisitItemLinks": {},
//                         "expandedRowContent1": {
//                             "pets": []
//                         },
//                         "elemId": "4",
//                         "appointment": null
//                     },
//                     "previousLeafState": {
//                         "id": 5,
//                         "ownerName": "null",
//                         "petName": "cat",
//                         "vlmVisitItemLinks": {},
//                         "expandedRowContent1": {
//                             "pets": []
//                         },
//                         "elemId": "4",
//                         "appointment": null
//                     },
//                     "message": [],
//                     "values": [],
//                     "labels": [],
//                     "elemLabels": {}
//                 },
//                 {
//                     "enabled": true,
//                     "visible": true,
//                     "activeValidationGroups": [],
//                     "collectionParams": [],
//                     "configId": "708",
//                     "collectionElem": true,
//                     "elemId": "5",
//                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/5",
//                     "type": {
//                         "model": {
//                             "params": [
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "673",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/5/id",
//                                     "type": {},
//                                     "leafState": 6,
//                                     "previousLeafState": 6,
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "674",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/5/appointment",
//                                     "type": {},
//                                     "leafState": null,
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Appointment Date"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "675",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/5/ownerName",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "leafState": "null",
//                                     "previousLeafState": "null",
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Owner's name"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "676",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/5/petName",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "leafState": "cat",
//                                     "previousLeafState": "cat",
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Pet's name"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "677",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/5/reasonForVisit",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Reason For Visit"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "678",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/5/status",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Status"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "679",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/5/showHistory",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "testsing btn in table"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "680",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/5/petQuestionnaire",
//                                     "type": {
//                                         "nested": false,
//                                         "name": "string",
//                                         "collection": false
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [
//                                         {
//                                             "locale": "en-US",
//                                             "text": "Pet Questionnaire"
//                                         }
//                                     ],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "681",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/5/vlmVisitItemLinks",
//                                     "type": {
//                                         "model": {
//                                             "params": [
//                                                 {
//                                                     "enabled": true,
//                                                     "visible": true,
//                                                     "activeValidationGroups": [],
//                                                     "collectionParams": [],
//                                                     "configId": "683",
//                                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/5/vlmVisitItemLinks/petQuestionnaire",
//                                                     "type": {
//                                                         "nested": false,
//                                                         "name": "string",
//                                                         "collection": false
//                                                     },
//                                                     "message": [],
//                                                     "values": [],
//                                                     "labels": [
//                                                         {
//                                                             "locale": "en-US",
//                                                             "text": "Pet Questionnaire"
//                                                         }
//                                                     ],
//                                                     "elemLabels": {}
//                                                 },
//                                                 {
//                                                     "enabled": true,
//                                                     "visible": true,
//                                                     "activeValidationGroups": [],
//                                                     "collectionParams": [],
//                                                     "configId": "684",
//                                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/5/vlmVisitItemLinks/petCareQuestionnaire",
//                                                     "type": {
//                                                         "nested": false,
//                                                         "name": "string",
//                                                         "collection": false
//                                                     },
//                                                     "message": [],
//                                                     "values": [],
//                                                     "labels": [
//                                                         {
//                                                             "locale": "en-US",
//                                                             "text": "Pet Care Questionnaire"
//                                                         }
//                                                     ],
//                                                     "elemLabels": {}
//                                                 }
//                                             ]
//                                         }
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [],
//                                     "elemLabels": {}
//                                 },
//                                 {
//                                     "enabled": true,
//                                     "visible": true,
//                                     "activeValidationGroups": [],
//                                     "collectionParams": [],
//                                     "configId": "685",
//                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/5/expandedRowContent1",
//                                     "type": {
//                                         "model": {
//                                             "params": [
//                                                 {
//                                                     "enabled": true,
//                                                     "visible": true,
//                                                     "activeValidationGroups": [],
//                                                     "collectionParams": [],
//                                                     "configId": "691",
//                                                     "path": "/visitlandingview/vpVisitsBulkAction/vtVisitBulkAction/vsVisitsBulkAction/visitBulkAction/5/expandedRowContent1/pets",
//                                                     "type": {
//                                                         "model": {
//                                                             "params": []
//                                                         }
//                                                     },
//                                                     "page": {
//                                                         "last": true,
//                                                         "totalPages": 1,
//                                                         "totalElements": 0,
//                                                         "size": 0,
//                                                         "number": 0,
//                                                         "first": true,
//                                                         "numberOfElements": 0
//                                                     },
//                                                     "gridData": {
//                                                         "collectionParams": []
//                                                     },
//                                                     "message": [],
//                                                     "values": [],
//                                                     "labels": [
//                                                         {
//                                                             "locale": "en-US",
//                                                             "text": "Pets"
//                                                         }
//                                                     ],
//                                                     "elemLabels": {}
//                                                 }
//                                             ]
//                                         }
//                                     },
//                                     "message": [],
//                                     "values": [],
//                                     "labels": [],
//                                     "elemLabels": {}
//                                 }
//                             ]
//                         }
//                     },
//                     "leafState": {
//                         "id": 6,
//                         "ownerName": "null",
//                         "petName": "cat",
//                         "vlmVisitItemLinks": {},
//                         "expandedRowContent1": {
//                             "pets": []
//                         },
//                         "elemId": "5",
//                         "appointment": null
//                     },
//                     "previousLeafState": {
//                         "id": 6,
//                         "ownerName": "null",
//                         "petName": "cat",
//                         "vlmVisitItemLinks": {},
//                         "expandedRowContent1": {
//                             "pets": []
//                         },
//                         "elemId": "5",
//                         "appointment": null
//                     },
//                     "message": [],
//                     "values": [],
//                     "labels": [],
//                     "elemLabels": {}
//                 }
//             ]
//         }
//     },
//     "page": {
//         "last": true,
//         "totalPages": 1,
//         "totalElements": 6,
//         "size": 0,
//         "number": 0,
//         "first": true,
//         "numberOfElements": 6
//     },
//     "gridData": {
//         "collectionParams": [],
//         "leafState": [
//             {
//                 "id": 1,
//                 "appointment": "2018-09-21T04:00:00.000Z",
//                 "ownerName": "test 1",
//                 "petName": "test pet",
//                 "reasonForVisit": "regular visit",
//                 "status": "",
//                 "vlmVisitItemLinks": {},
//                 "expandedRowContent1": {
//                     "pets": []
//                 },
//                 "elemId": "0"
//             },
//             {
//                 "id": 2,
//                 "ownerName": "null",
//                 "petName": "cat",
//                 "status": "Cancelled",
//                 "vlmVisitItemLinks": {},
//                 "expandedRowContent1": {
//                     "pets": []
//                 },
//                 "elemId": "1",
//                 "appointment": null
//             },
//             {
//                 "id": 3,
//                 "ownerName": "null",
//                 "petName": "cat",
//                 "status": "Cancelled",
//                 "vlmVisitItemLinks": {},
//                 "expandedRowContent1": {
//                     "pets": []
//                 },
//                 "elemId": "2",
//                 "appointment": null
//             },
//             {
//                 "id": 4,
//                 "ownerName": "null",
//                 "petName": "cat",
//                 "status": "Cancelled",
//                 "vlmVisitItemLinks": {},
//                 "expandedRowContent1": {
//                     "pets": []
//                 },
//                 "elemId": "3",
//                 "appointment": null
//             },
//             {
//                 "id": 5,
//                 "ownerName": "null",
//                 "petName": "cat",
//                 "vlmVisitItemLinks": {},
//                 "expandedRowContent1": {
//                     "pets": []
//                 },
//                 "elemId": "4",
//                 "appointment": null
//             },
//             {
//                 "id": 6,
//                 "ownerName": "null",
//                 "petName": "cat",
//                 "vlmVisitItemLinks": {},
//                 "expandedRowContent1": {
//                     "pets": []
//                 },
//                 "elemId": "5",
//                 "appointment": null
//             }
//         ],
//         "stateMap": [
//             {
//                 "id": {},
//                 "appointment": {},
//                 "ownerName": {},
//                 "petName": {},
//                 "reasonForVisit": {},
//                 "status": {},
//                 "showHistory": {},
//                 "petQuestionnaire": {},
//                 "vlmVisitItemLinks": {},
//                 "expandedRowContent1": {}
//             },
//             {
//                 "id": {},
//                 "appointment": {},
//                 "ownerName": {},
//                 "petName": {},
//                 "reasonForVisit": {},
//                 "status": {},
//                 "showHistory": {},
//                 "petQuestionnaire": {},
//                 "vlmVisitItemLinks": {},
//                 "expandedRowContent1": {}
//             },
//             {
//                 "id": {},
//                 "appointment": {},
//                 "ownerName": {},
//                 "petName": {},
//                 "reasonForVisit": {},
//                 "status": {},
//                 "showHistory": {},
//                 "petQuestionnaire": {},
//                 "vlmVisitItemLinks": {},
//                 "expandedRowContent1": {}
//             },
//             {
//                 "id": {},
//                 "appointment": {},
//                 "ownerName": {},
//                 "petName": {},
//                 "reasonForVisit": {},
//                 "status": {},
//                 "showHistory": {},
//                 "petQuestionnaire": {},
//                 "vlmVisitItemLinks": {},
//                 "expandedRowContent1": {}
//             },
//             {
//                 "id": {},
//                 "appointment": {},
//                 "ownerName": {},
//                 "petName": {},
//                 "reasonForVisit": {},
//                 "status": {},
//                 "showHistory": {},
//                 "petQuestionnaire": {},
//                 "vlmVisitItemLinks": {},
//                 "expandedRowContent1": {}
//             },
//             {
//                 "id": {},
//                 "appointment": {},
//                 "ownerName": {},
//                 "petName": {},
//                 "reasonForVisit": {},
//                 "status": {},
//                 "showHistory": {},
//                 "petQuestionnaire": {},
//                 "vlmVisitItemLinks": {},
//                 "expandedRowContent1": {}
//             }
//         ]
//     },
//     "message": [],
//     "values": [],
//     "labels": [
//         {
//             "locale": "en-US",
//             "text": "Bulk Visits",
//             "helpText": "testing tooltip"
//         }
//     ],
//     "elemLabels": {
//         "get": () => {}
//     }
// };