import { ModuleWithProviders }    from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { CustomerListComponent, CustomerDetailComponent }    from './customer/customer.index';

const SalesRoutes: Routes = [
  { path: 'customer',
    children:[
      { path: '', redirectTo:"list"},
      { path: 'list', component: CustomerListComponent },
      { path: 'detail',   component: CustomerDetailComponent }
    ]
  },

  // { path: 'salesMng',
  //   children:[
  //     { path: '', redirectTo:"list",},
  //     { path: 'list', component: AuthrityMngListComponent },
  //     { path: 'insert', component: AuthrityMngInsertComponent, data:{menuType:'insert'}, },  
  //     { path: 'detail/:authId', component: AuthrityMngDetailComponent , data:{menuType:'detail'} }, 
  //   ]
  // }
]

export const SalesRouting: ModuleWithProviders = RouterModule.forChild(SalesRoutes);