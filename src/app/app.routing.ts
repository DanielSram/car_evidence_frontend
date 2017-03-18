import { RouterModule, Routes } from '@angular/router';

import { TractorListComponent } from './tractor-list/tractor-list.component';
import { AboutComponent } from './about/about.component';
import { CarDetailComponent } from './tractor-detail/tractor-detail.component';
import { ClientManagementComponent } from './client-management/client-management.component';
import { CreateLendingComponent } from './create-lending/create-lending.component';

/**
 * Application routing
 */
const routes: Routes = [
    {path: '', component: TractorListComponent},
    {path: 'about', component: AboutComponent},
    {path: 'detail/:id', component: CarDetailComponent},
    {path: 'clients', component: ClientManagementComponent},
    {path: 'createLending', component: CreateLendingComponent},
    {path: 'homeWithMessage/:message', component: TractorListComponent},
];

export const routing = RouterModule.forRoot(routes);
