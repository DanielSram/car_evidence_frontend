import {NgModule, ApplicationRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule, JsonpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '@angular/material';

import {AppComponent} from './app.component';
import {AboutComponent} from './about/about.component';
import {TractorListComponent} from './tractor-list/tractor-list.component';
import {ApiService} from './shared';
import {routing} from './app.routing';

import {removeNgStyles, createNewHosts} from '@angularclass/hmr';
import {TractorService} from './shared/tractor.service';
import {CarDetailComponent} from './tractor-detail/tractor-detail.component';
import {EditTractorComponent} from './edit-tractor/edit-tractor.component';
import {SetTechnicalRevisionComponent} from './set-technical-revision/set-technical-revision-component';
import {ClientManagementComponent} from './client-management/client-management.component';
import {ClientService} from './shared/client.service';
import {CreateClientComponent} from './client-management/create-client.component';
import {ClientDetailComponent} from './client-management/client-detail.component';
import { CarStateTranslatorPipe } from './pipes/car-state-translator.pipe';
import { CarTypeTranslatorPipe } from './pipes/car-type-translator.pipe';
import { CreateLendingComponent } from './create-lending/create-lending.component';
import { LendingService } from './shared/lending.service';
import { CreateTractorComponent } from './tractor-list/create-tractor.component';
import { MillisecondBeautifierPipe } from './pipes/date-beautifier.pipe';
import { TechnicalRevisionService } from './shared/technical-revision.service';
import { CarsNeedingRevisionComponent } from './cars-needing-revision/cars-needing-revision.component';
import { LendingDetailComponent } from './lending-detail/lending-detail.component';
import { CarsRevisionsListComponent } from './cars-revisions-list/cars-revisions-list.component';
import { AppConfigService } from './shared/app-config.service';
import { RepairService } from './shared/repair.service';
import { CreateRepairComponent } from './create-repair/create-repair.component';
import { CarsRepairsListComponent } from './cars-repair-list/cars-repair-list.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        routing
    ],
    declarations: [
        AppComponent,
        TractorListComponent,
        AboutComponent,
        EditTractorComponent,
        CarDetailComponent,
        SetTechnicalRevisionComponent,
        ClientManagementComponent,
        CreateClientComponent,
        ClientDetailComponent,
        CarStateTranslatorPipe,
        CarTypeTranslatorPipe,
        MillisecondBeautifierPipe,
        CreateLendingComponent,
        CreateTractorComponent,
        CarsNeedingRevisionComponent,
        LendingDetailComponent,
        CarsRevisionsListComponent,
        CreateRepairComponent,
        CarsRepairsListComponent,
    ],
    providers: [
        ApiService,
        TractorService,
        ClientService,
        LendingService,
        TechnicalRevisionService,
        AppConfigService,
        RepairService,
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        EditTractorComponent,
        SetTechnicalRevisionComponent,
        CreateClientComponent,
        ClientDetailComponent,
        CreateTractorComponent,
        LendingDetailComponent,
        CreateRepairComponent,
    ]
})
export class AppModule {
    constructor(public appRef: ApplicationRef) {
    }

    hmrOnInit(store) {
        console.log('HMR store', store);
    }

    hmrOnDestroy(store) {
        let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
