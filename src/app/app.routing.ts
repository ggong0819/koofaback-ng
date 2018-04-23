import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/index';

import { HomeComponent } from './layout/home.component';
import { PageNotFoundComponent }        from './common/pageNotFound.component';

import { LoginComponent } from './common/login.component';
import {CommonCodeResolver} from './services/common-resolver.service'

const appRoutes: Routes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    // { path: '', canActivate: [AuthGuard], redirectTo: 'user/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},

    { path: '', component: HomeComponent,
        resolve:{commonCode:CommonCodeResolver},
        canActivate: [AuthGuard],
        children:[
            // { path: '', canActivate: [AuthGuard], redirectTo: 'user/login', pathMatch: 'full' },
            { path: 'settings', loadChildren: 'app/settings/settings.module#SettingsModule', resolve:{commonCode:CommonCodeResolver}},
            { path: 'sales', loadChildren: 'app/sales/sales.module#SalesModule', resolve:{commonCode:CommonCodeResolver}},
        ]
    },
    

    { path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: false });