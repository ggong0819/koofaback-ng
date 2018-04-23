import { NgModule }         from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonSharedModule } from '../common/module/comon-share.module';
import { SalesService }  from './sales.service';
import { SalesRouting }  from './sales.routing';
import { Ng2PaginationModule } from 'ng2-pagination';
import { ModalModule} from 'ngx-bootstrap';

import { CustomerListComponent, CustomerDetailComponent, CustomerService, PersonComponent, PersonDirective}    from './customer/customer.index';

@NgModule({
  imports:[ 
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    Ng2PaginationModule,
    ModalModule.forRoot(),
    SalesRouting,
    CommonSharedModule
  ],
  declarations:[ 
    CustomerListComponent,
    CustomerDetailComponent,
    PersonDirective,
    PersonComponent    
  ],
  providers:[ 
    SalesService,
    CommonModule,
    CustomerService,
  ],
  entryComponents :[
    PersonComponent
  ]
})

export class SalesModule {

}