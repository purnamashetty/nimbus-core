// As all methods are private. we wont be able test this component

'use strict';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { HttpModule } from '@angular/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of as observableOf,  Observable } from 'rxjs';
import { NavigationEnd, Router, ActivatedRoute, Route, ActivatedRouteSnapshot, UrlSegment, Params, Data, ParamMap, PRIMARY_OUTLET } from '@angular/router';
import { StorageServiceModule, SESSION_STORAGE } from 'angular-webstorage-service';
import { By } from '@angular/platform-browser';

import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbService } from './breadcrumb.service';
import { PageService } from './../../../services/page.service';
import { CustomHttpClient } from './../../../services/httpclient.service';
import { LoaderService } from './../../../services/loader.service';
import { ConfigService } from './../../../services/config.service';
import { DomainFlowCmp } from './../../domain/domain-flow.component';
import { SessionStoreService, CUSTOM_STORAGE } from './../../../services/session.store';
import { configureTestSuite } from 'ng-bullet';
import { setup, TestContext } from '../../../setup.spec';
import * as data from './breadcrumb-component-payload.json';

let router, activatedRoute, breadcrumbService;

export class MockActivatedRoute implements ActivatedRoute {
    snapshot: ActivatedRouteSnapshot;
    url: Observable<UrlSegment[]>;
    params: Observable<Params>;
    queryParams: Observable<Params>;
    fragment: Observable<string>;
    outlet: string;
    component: any;
    routeConfig: Route;
    root: any = {
        children: [{
            outlet: PRIMARY_OUTLET,
            component: 'test',
            children: [],
            snapshot: {
                params: {
                    pageId: 1
                }
            }
        }]
    };
    parent: ActivatedRoute;
    firstChild: ActivatedRoute;
    children: ActivatedRoute[];
    pathFromRoot: ActivatedRoute[];
    data = observableOf({
            layout: 'test'
      });
    paramMap: Observable<ParamMap>;
    queryParamMap: Observable<ParamMap>;
  }

  export class MockActivatedRoute1 implements ActivatedRoute {
    snapshot: ActivatedRouteSnapshot;
    url: Observable<UrlSegment[]>;
    params: Observable<Params>;
    queryParams: Observable<Params>;
    fragment: Observable<string>;
    outlet: string;
    component: any;
    routeConfig: Route;
    root: any = {
        children: [{
            outlet: PRIMARY_OUTLET,
            component: DomainFlowCmp,
            children: [],
            snapshot: {
                params: ''
            }
        }, {
            outlet: '',
            comsponent: DomainFlowCmp,
            snapshot: {
                params: ''
            }
        },{
            outlet: '',
            component: '',
            children: [],
            snapshot: {
                params: ''
            }
        }]
    };
    parent: ActivatedRoute;
    firstChild: ActivatedRoute;
    children: ActivatedRoute[];
    pathFromRoot: ActivatedRoute[];
    data = observableOf({
            layout: 'test'
      });
    paramMap: Observable<ParamMap>;
    queryParamMap: Observable<ParamMap>;
  }

  export class MockActivatedRoute2 implements ActivatedRoute {
    snapshot: ActivatedRouteSnapshot;
    url: Observable<UrlSegment[]>;
    params: Observable<Params>;
    queryParams: Observable<Params>;
    fragment: Observable<string>;
    outlet: string;
    component: any;
    routeConfig: Route;
    root: any = {
        children: [{
            outlet: PRIMARY_OUTLET,
            component: 'test',
            children: [],
            snapshot: {
                params: {
                    pageId: 1
                }
            }
        }]
    };
    parent: ActivatedRoute;
    firstChild: ActivatedRoute;
    children: ActivatedRoute[];
    pathFromRoot: ActivatedRoute[];
    data = observableOf({
            layout: 'test'
      });
    paramMap: Observable<ParamMap>;
    queryParamMap: Observable<ParamMap>;
  }

class MockRouter {
    public events = observableOf( new NavigationEnd(0, 'http://localhost:4200/login', 'http://localhost:4200/login'));
    createUrlTree = () => {}
    serializeUrl = () => {return ''}
}

class MockBreadcrumbService {
    isHomeRoute(a) {
        return true;
    }
    getByPageId(a) {
        console.log('getByPageId is being');
        return '123';
    }
    getHomeBreadcrumb(a) { return 't'; }
}

class MockBreadcrumbService1 {
    isHomeRoute(a) {
        return true;
    }
    getByPageId(a) {
        console.log('mock is getting called bs');
        return 123;
    }
    getHomeBreadcrumb(a) { return 't'; }
}

const declarations = [
    BreadcrumbComponent
   ];
const imports = [
    RouterTestingModule,
    HttpModule,
    HttpClientTestingModule,
    StorageServiceModule
   ];
const  providers = [
    {provide: Router, useClass: MockRouter},
    {provide: ActivatedRoute, useClass: MockActivatedRoute},
    {provide: BreadcrumbService, useClass: MockBreadcrumbService},
    { provide: CUSTOM_STORAGE, useExisting: SESSION_STORAGE },
    PageService,
    CustomHttpClient,
    LoaderService,
    ConfigService
   ];

   const breadcrumbs = [
    {
        "id": "vpOwners",
        "label": "Owners",
        "params": null,
        "url": "/h/ownerlandingview/vpOwners"
    },
    {
        "id": "vpDashboard",
        "label": "Home",
        "params": null,
        "url": "/h/petclinicdashboard/vpDashboard"
    }
];

describe('BreadcrumbComponent', () => {
    configureTestSuite();
    setup(BreadcrumbComponent, declarations, imports, providers);

  beforeEach(async(() => {    
    router = TestBed.get(Router);
    activatedRoute = TestBed.get(ActivatedRoute);
    breadcrumbService = TestBed.get(BreadcrumbService);
  }));

  it('should create the BreadcrumbComponent', async function (this: TestContext<BreadcrumbComponent>) {
    expect(this.hostComponent).toBeTruthy();
  });

  it('anchor tag should be created', async function (this: TestContext<BreadcrumbComponent>) {
    this.hostComponent.breadcrumbs = breadcrumbs;
    this.fixture.detectChanges();
    const debugElement = this.fixture.debugElement;
    const anchor = debugElement.query(By.css('a'));
    expect(anchor.name).toEqual('a');
  });

  it('anchor tag should not be created', async function (this: TestContext<BreadcrumbComponent>) {
    this.hostComponent.breadcrumbs = [];
    this.fixture.detectChanges();
    const debugElement = this.fixture.debugElement;
    const anchor = debugElement.query(By.css('a'));
    expect(anchor).toBeFalsy();
  });

  it('should create the app', async(() => {
    expect(this.hc).toBeTruthy();
  }));

  it('ngOnInit() should call the _loadBreadcrumbs() method', async(() => {
    spyOn(this.hostComponent, '_loadBreadcrumbs').and.callThrough();
    this.hostComponent.ngOnInit();
    expect(this.hostComponent._loadBreadcrumbs).toHaveBeenCalled();
  }));

  it('ngOnInit() should call the breadcrumbService.getHomeBreadcrumb() method', async(() => {
    spyOn(breadcrumbService, 'getHomeBreadcrumb').and.callThrough();
    spyOn(breadcrumbService, 'isHomeRoute').and.returnValue(false);
    this.hostComponent.ngOnInit();
    expect(breadcrumbService.getHomeBreadcrumb).toHaveBeenCalled();
  }));

});

