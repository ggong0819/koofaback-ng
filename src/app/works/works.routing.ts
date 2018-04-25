import { ModuleWithProviders }    from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { WorkListComponent, WorkRequestListComponent }    from './work/work.index';

const WorksRoutes: Routes = [
  { path: 'works',
    children:[
      { path: '', redirectTo:"requestList"},
      { path: 'requestList', component: WorkRequestListComponent },
      { path: 'list', component: WorkListComponent },
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

export const WorksRouting: ModuleWithProviders = RouterModule.forChild(WorksRoutes);