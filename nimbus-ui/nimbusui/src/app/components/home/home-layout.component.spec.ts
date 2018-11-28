'use strict';
import { TestBed, async } from '@angular/core/testing';
import * as Stomp from 'stompjs';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/primeng';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import { of as observableOf,  Observable } from 'rxjs';
import {
  ActivatedRoute,
  Route,
  ActivatedRouteSnapshot,
  UrlSegment,
  Params,
  Data,
  ParamMap
} from '@angular/router';
import { StorageServiceModule, SESSION_STORAGE } from 'angular-webstorage-service';
import { JL } from 'jsnlog';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Component, Input, ViewChildren } from '@angular/core';
import { By } from '@angular/platform-browser';

import { HomeLayoutCmp } from './home-layout.component';
import { FooterGlobal } from '../platform/footer/footer-global.component';
// import { HeaderGlobal } from '../platform/header/header-global.component';
// import { Link } from '../platform/link.component';
import { Paragraph } from '../platform/content/paragraph.component';
import { ComboBox } from '../platform/form/elements/combobox.component';
import { KeysPipe } from '../../pipes/app.pipe';
import { Value } from '../platform/form/elements/value.component';
import { SelectItemPipe } from '../../pipes/select-item.pipe';
import { TooltipComponent } from '../platform/tooltip/tooltip.component';
import { CustomHttpClient } from '../../services/httpclient.service';
import { WebContentSvc } from '../../services/content-management.service';
import { PageService } from '../../services/page.service';
import { LoaderService } from '../../services/loader.service';
import { ConfigService } from '../../services/config.service';
import { AuthenticationService } from '../../services/authentication.service';
import { BreadcrumbService } from '../platform/breadcrumb/breadcrumb.service';
import { LayoutService } from '../../services/layout.service';
import { LoggerService } from '../../services/logger.service';
import { SessionStoreService, CUSTOM_STORAGE } from '../../services/session.store';
import { AppInitService } from '../../services/app.init.service'
import { SvgComponent } from '../platform/svg/svg.component';
import { Button } from '../platform/form/elements/button.component';
import { ActionDropdown, ActionLink } from '../platform/form/elements/action-dropdown.component';
import { InputLabel } from '../platform/form/elements/input-label.component';
import { Image } from '../platform/image.component';
import { setup, TestContext } from '../../setup.spec';
import { configureTestSuite } from 'ng-bullet';
import * as data from './home-layout-payload.json';


@Component({
  template: '<div></div>',
  selector: 'nm-panelMenuSub'
})
export class NmPanelMenuSub {
  @Input() item: any;
  @Input() expanded: boolean;
}

@Component({
  template: '<div></div>',
  selector: 'nm-link'
})
export class Link {
  @Input() element: any;
  @Input() root: any;
  @Input() inClass: string;
  @Input() renderAsLink: boolean;
  @Input() rowData?: any;
  private linkClass: string = 'basicView';
  private imagesPath: string;
  componentTypes: any;
}

@Component({
  template: '<div></div>',
  selector: 'nm-header-global'
})
export class HeaderGlobal {
  @Input() branding : any;
  @Input() topMenuItems: any[];
  @Input() leftMenuItems: any[];
  @Input() element: any;
  private imagesPath: string;
  private _homeRoute: string;
  @ViewChildren('dropDown') dropDowns: any;
  mouseEventSubscription: any;
}

@Component({
  template: '<div></div>',
  selector: 'nm-panelMenu'
})
export class NmPanelMenu {
  @Input() model: any[];
  @Input() style: any;
  @Input() styleClass: string;
  @Input() multiple: boolean = true;  
}

class MockAuthenticationService {
  logout() {
    const logout = 'testing';
    return observableOf(logout);
  }
}
class MockPageService {
    public config$: Subject<any>;
  
    constructor() {
      this.config$ = new Subject();
    }
  
    loadFlowConfig(a) {}
    loadDefaultPageForConfig(a) {}
    logError(a) {
      this.config$.next(a);
    }
    traverseFlowConfig(a, b) {}
  }
class MockLayoutService {
  public layout$: Subject<any>;

  constructor() {
    this.layout$ = new Subject<any>();
  }

  parseLayoutConfig(layout) {
    this.layout$.next(layout);
  }

  getLayout() {}
}

class MockLoggerService {
  debug() { }
  info() { }
  error() { }
}

class MockWebContentSvc {
  findLabelContent(a) {}
}

export class MockActivatedRoute implements ActivatedRoute {
  snapshot: ActivatedRouteSnapshot;
  url: Observable<UrlSegment[]>;
  params: Observable<Params>;
  queryParams: Observable<Params>;
  fragment: Observable<string>;
  outlet: string;
  component: any;
  routeConfig: Route;
  root: ActivatedRoute;
  parent: ActivatedRoute;
  firstChild: ActivatedRoute;
  children: ActivatedRoute[];
  pathFromRoot: ActivatedRoute[];
  data: any = {
    value: {
      layout: 'test'
    }
  };
  paramMap: Observable<ParamMap>;
  queryParamMap: Observable<ParamMap>;
}

class MockSTOMPService {
  configure() {}
  try_connect() {
    return new Promise((resolve, reject) => {
      resolve('abcd');
    });
  }
  disconnect() {}
}

let layoutService, activatedRoute, pageService;

const declarations= [
    HomeLayoutCmp,
    FooterGlobal,
    HeaderGlobal,
    Link,
    Paragraph,
    ComboBox,
    KeysPipe,
    Value,
    SelectItemPipe,
    TooltipComponent,
    SvgComponent,
    Button,
    ActionDropdown,
    InputLabel,
    Image,
    ActionLink,
    NmPanelMenu,
    NmPanelMenuSub
  ];
  const providers = [
    { provide: AuthenticationService, useClass: MockAuthenticationService },
    { provide: LayoutService, useClass: MockLayoutService },
    { provide: ActivatedRoute, useClass: MockActivatedRoute },
    { provide: PageService, useClass: MockPageService },
    { provide: CUSTOM_STORAGE, useExisting: SESSION_STORAGE },
    { provide: 'JSNLOG', useValue: JL },
    {provide: LoggerService, useClass: MockLoggerService},
    {provide: WebContentSvc, useClass: MockWebContentSvc},
    CustomHttpClient,
    LoaderService,
    ConfigService,
    BreadcrumbService,
    SessionStoreService,
    AppInitService
  ];
  const imports = [
    RouterTestingModule,
    FormsModule,
    DropdownModule,
    HttpClientModule,
    HttpModule,
    StorageServiceModule,
    AngularSvgIconModule
  ];

describe('HomeLayoutCmp', () => {

    configureTestSuite();
    setup(HomeLayoutCmp, declarations, imports, providers);

  beforeEach(async function(this: TestContext<HomeLayoutCmp>) {
    layoutService = TestBed.get(LayoutService);
    activatedRoute = TestBed.get(ActivatedRoute);
    pageService = TestBed.get(PageService);
  });

  it('should create the app', function (this: TestContext<HomeLayoutCmp>) {
    expect(this.hostComponent).toBeTruthy();
  });

  it('button, panelMenu, headerGlobal, footer should be created', function (this: TestContext<HomeLayoutCmp>) {
    layoutService.parseLayoutConfig(layout);
    this.fixture.detectChanges();
    this.hostComponent.ngOnInit();
    layoutService.parseLayoutConfig(layout);
    const debugElement = this.fixture.debugElement;
    const panelMenu = debugElement.query(By.css('nm-panelMenu'));
    const button  = debugElement.query(By.css(".navbar-toggler.collapsed"));
    const headerGlobal  = debugElement.query(By.css('nm-header-global'));
    const footer = debugElement.query(By.css('nm-footer-global'));
    expect(button.name).toEqual('button');
    expect(button.nativeElement.classList.contains('navbar-toggler', 'collapsed', 'home')).toBeTruthy();
    expect(panelMenu.name).toEqual('nm-panelMenu');
    expect(headerGlobal.name).toEqual('nm-header-global');
    expect(footer.name).toEqual('nm-footer-global');
  });

  it('ngOnInint() should get layout from layout service', function (this: TestContext<HomeLayoutCmp>) {
    spyOn(layoutService, 'getLayout').and.callThrough();
    this.hostComponent.ngOnInit();
    const layout = {
      topBar: {
        branding: 'test',
        headerMenus: 'tHeaderMenus'
      },
      menu: [],
      footer: 'FooterConfig',
    };
    layoutService.parseLayoutConfig(layout);
    expect(layoutService.getLayout).toHaveBeenCalled();
  });

  it('ngOnInint() should not get layout from layout service', function (this: TestContext<HomeLayoutCmp>) {
    spyOn(layoutService, 'getLayout').and.callThrough();
    activatedRoute.data['value']['layout'] = null;
    this.hostComponent.ngOnInit();
    const layout = {
      topBar: {
        branding: 'test',
        headerMenus: 'tHeaderMenus'
      },
      menu: [],
      footer: 'FooterConfig',
    };
    layoutService.parseLayoutConfig(layout);
    expect(layoutService.getLayout).not.toHaveBeenCalled();
  });

  it('ngOnInint() should update the class properties', function (this: TestContext<HomeLayoutCmp>) {
    this.hostComponent.ngOnInit();
    const layout: any = {
      topBar: {
        branding: 'test',
        headerMenus: 'tHeaderMenus'
      },
      menu: [],
      footer: 'FooterConfig',
    };
    layoutService.parseLayoutConfig(layout);
    const res: any = 'test';
    expect(this.hostComponent.branding).toEqual(res);
    expect(this.hostComponent.topMenuItems).toEqual(layout.topBar.headerMenus);
  });

  it('ngOnInint() should not update the class properties', function (this: TestContext<HomeLayoutCmp>) {
    this.hostComponent.ngOnInit();
    const layout = {};
    layoutService.parseLayoutConfig(layout);
    const res: any = 'test';
    expect(this.hostComponent.branding).not.toEqual(res);
  });

  it('ngOnInint() should not update the class properties if layout is null', function (this: TestContext<HomeLayoutCmp>) {
    this.hostComponent.ngOnInit();
    const layout = {};
    layoutService.parseLayoutConfig();
    const res: any = 'test';
    expect(this.hostComponent.branding).not.toEqual(res);
  });

  it('toggelSideNav should update collapse property', function (this: TestContext<HomeLayoutCmp>) {
    this.hostComponent.collapse = true;
    this.hostComponent.toggelSideNav();
    expect(this.hostComponent.collapse).toEqual(false);
  });

  it('get activeTheme should return activeTheme property', function (this: TestContext<HomeLayoutCmp>) {
    this.hostComponent.activeTheme = 'test';
    this.hostComponent.activeTheme = 'test';
    expect(this.hostComponent.activeTheme).toEqual('test');
  });

  it('on_next() should call pageService.traverseFlowConfig()', function (this: TestContext<HomeLayoutCmp>) {
    const test1 = JSON.stringify({
      result: [
        {
          result: {
            value: {
              path: 'test/t'
            }
          }
        }
      ]
    });
    const test = {
      body: test1
    };
    spyOn(pageService, 'traverseFlowConfig').and.callThrough();
    this.hostComponent.on_next(test);
    expect(pageService.traverseFlowConfig).toHaveBeenCalled();
  });

});

const layout:any = {
    "menu": [
        {
            "label": "Home",
            "path": "/home/vpHome/vsHomeLeftBar/home",
            "page": "",
            "icon": "tasksIcon",
            "imgType": "FA",
            "url": "petclinicdashboard/vpDashboard",
            "type": "INTERNAL",
            "target": "",
            "rel": "",
            "routerLink": "/h/petclinicdashboard/vpDashboard",
            "code": "home"
        },
        {
            "label": "Veterinarians",
            "path": "/home/vpHome/vsHomeLeftBar/vets",
            "page": "",
            "icon": "caseHistoryIcon",
            "imgType": "FA",
            "url": "veterinarianview/vpVeterenarians",
            "type": "INTERNAL",
            "target": "",
            "rel": "",
            "routerLink": "/h/veterinarianview/vpVeterenarians",
            "code": "vets"
        },
        {
            "label": "Owners",
            "path": "/home/vpHome/vsHomeLeftBar/owners",
            "page": "",
            "icon": "caseHistoryIcon",
            "imgType": "FA",
            "url": "ownerlandingview/vpOwners",
            "type": "INTERNAL",
            "target": "",
            "rel": "",
            "routerLink": "/h/ownerlandingview/vpOwners",
            "code": "owners"
        },
        {
            "label": "Pets",
            "path": "/home/vpHome/vsHomeLeftBar/pets",
            "page": "",
            "icon": "caseHistoryIcon",
            "imgType": "FA",
            "url": "petview/vpAllPets",
            "type": "INTERNAL",
            "target": "",
            "rel": "",
            "routerLink": "/h/petview/vpAllPets",
            "code": "pets"
        },
        {
            "label": "Notes",
            "path": "/home/vpHome/vsHomeLeftBar/notes",
            "page": "",
            "icon": "notesIcon",
            "imgType": "FA",
            "url": "petclinicdashboard/vpNotes",
            "type": "INTERNAL",
            "target": "",
            "rel": "",
            "routerLink": "/h/petclinicdashboard/vpNotes",
            "code": "notes"
        }
    ],
    "topBar": {
        "branding": {
            "logo": {
                "configSvc": {
                    "flowConfigs": {
                        "ownerview": {
                            "model": {
                                "params": [ ]
                            },
                            "layout": "home"
                        },
                        "home": {
                            "model": {
                                "params": [ ]
                            }
                        }
                    }
                },
                "enabled": true,
                "visible": true,
                "activeValidationGroups": [],
                "collectionParams": [],
                "configId": "3923",
                "path": "/home/vpHome/vsHomeHeader/linkHomeLogo",
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
                        "text": "Anthem"
                    }
                ],
                "elemLabels": {}
            }
        },
        "headerMenus": [],
        "accordions": [
            null
        ]
    },
    "footer": {
        "links": [
            null,
            null,
            null,
            null
        ]
    },
    "modalList": [
        null
    ]
}
