import { ModuleWithProviders }    from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { WorkListComponent, WorkRequestListComponent, WorkRequestDetailComponent }    from './work/work.index';

const WorksRoutes: Routes = [
  { path: 'request',
    children:[
      { path: '', redirectTo:"list"},
      { path: 'list', component: WorkRequestListComponent },
      { path: 'detail', component: WorkRequestDetailComponent },
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