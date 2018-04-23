import { ModuleWithProviders }    from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { CodeBaseListComponent, CodeManageComponent, CodeChildListComponent, CodeChildManageComponent }  from './code/code.index';

import { AuthrityMngListComponent, AuthrityMngDetailComponent, AuthrityMngInsertComponent }    from './authority/auth.index';

import { UserListComponent, UserDetailComponent }    from './user/user.index';

import { MenuMainComponent } from './menu/menu.index';

import {} from './menu/menu.index';

const SettingsRoutes: Routes = [
  { path: 'code',
    children:[
      { path: '', redirectTo:"base/list"},
      { path: 'base/list', component: CodeBaseListComponent },
      { path: 'base/manage',   component: CodeManageComponent },
      { path: 'child/list', component: CodeChildListComponent },
      { path: 'child/manage', component: CodeChildManageComponent },
    ]
  },

  { path: 'authorityMng',
    children:[
      { path: '', redirectTo:"list",},
      { path: 'list', component: AuthrityMngListComponent },
      { path: 'insert', component: AuthrityMngInsertComponent, data:{menuType:'insert'}, },  
      { path: 'detail/:authId', component: AuthrityMngDetailComponent , data:{menuType:'detail'} }, 
    ]
  },

  { path: 'userMng', 
    children:[
      { path: '', redirectTo:"list",},
      { path: 'list', component: UserListComponent},
      { path: 'detail/:userId', component: UserDetailComponent , }, 
    ]
  },

  {
    path:'menu',
    children:[
      { path: '', redirectTo:"main", },
      { path: "main", component: MenuMainComponent, }
    ]
  }  
]

export const SettingsRouting: ModuleWithProviders = RouterModule.forChild(SettingsRoutes);