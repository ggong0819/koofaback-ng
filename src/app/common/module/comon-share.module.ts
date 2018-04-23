import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule} from 'ngx-bootstrap';

//UI Components
import { RadioListComponent} from '../components/radio-list/radio-list.component'
import { CheckListComponent} from '../components/check-list/check-list.component'
import { Ng2PaginationModule } from 'ng2-pagination';
import { MyDatePickerModule } from 'mydatepicker';
import { RegModfComponent } from '../components/RegModfComponent';
import { TreeNodeView, TreeView } from '../components/tree/tree.component';
import { ListSelectComponent } from '../components/ListSelectComponent';

import { PlayerComponent } from '../components/player/player.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        Ng2PaginationModule,
        MyDatePickerModule,
    ],
    declarations :[
        RadioListComponent,
        CheckListComponent,
        RegModfComponent,
        TreeView,
        TreeNodeView,
        ListSelectComponent,
        PlayerComponent,
    ],
    exports:[
        RadioListComponent,
        CheckListComponent,
        RegModfComponent,
        TreeView,
        TreeNodeView,   
        ListSelectComponent,
        PlayerComponent,
    ],
    providers:[
    ]
})

export class CommonSharedModule { }