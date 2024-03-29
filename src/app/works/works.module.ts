import { NgModule }         from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonSharedModule } from '../common/module/comon-share.module';
import { WorksService }  from './works.service';
import { WorksRouting }  from './works.routing';
import { Ng2PaginationModule } from 'ng2-pagination';
import { ModalModule} from 'ngx-bootstrap';

import { WorkListComponent, WorkRequestListComponent, WorkService, WorkRequestDetailComponent}    from './work/work.index';
import { CustomerService}    from '../sales/customer/customer.service';

@NgModule({
  imports:[ 
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    Ng2PaginationModule,
    ModalModule.forRoot(),
    WorksRouting,
    CommonSharedModule
  ],
  declarations:[ 
    WorkListComponent,
    WorkRequestListComponent,
    WorkRequestDetailComponent
  ],
  providers:[ 
    WorksService,
    CommonModule,
    WorkService,
    CustomerService
  ]
})

export class WorksModule {

}