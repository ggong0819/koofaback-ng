import { NgModule }         from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonSharedModule } from '../common/module/comon-share.module';
import { SettingsService }  from './settings.service';
import { SettingsRouting }  from './settings.routing';
import { Ng2PaginationModule } from 'ng2-pagination';
import { ModalModule} from 'ngx-bootstrap';

import { CodeBaseListComponent, CodeManageComponent, CodeChildListComponent, CodeBaseInfoTable, CodeChildManageComponent, CodeService }  from './code/code.index';
import { AuthrityMngListComponent, AuthrityMngDetailComponent, AuthrityMngInsertComponent, AuthService, AuthMenuTreeComponent }    from './authority/auth.index';
import { UserListComponent, UserDetailComponent, UserService}    from './user/user.index';
import { MenuService, MenuMainComponent } from './menu/menu.index';

@NgModule({
  imports:[ 
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    Ng2PaginationModule,
    ModalModule.forRoot(),
    SettingsRouting,
    CommonSharedModule,
    
  ],
  declarations:[ 
    CodeBaseListComponent,
    CodeManageComponent,
    CodeChildListComponent,
    CodeBaseInfoTable,
    CodeChildManageComponent,
    AuthrityMngListComponent,
    AuthrityMngDetailComponent,
    AuthrityMngInsertComponent,
    AuthMenuTreeComponent,
    UserListComponent,
    UserDetailComponent,
    MenuMainComponent,
  ],
  providers:[ 
    SettingsService,
    AuthService,
    MenuService,
    CodeService,
    CommonModule,
    UserService,
  ],
})

export class SettingsModule {

}