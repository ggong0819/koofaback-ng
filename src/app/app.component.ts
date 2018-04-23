import { Component } from '@angular/core';

import { LeftSideComponent} from './layout/left-side.component'
import { HeaderComponent }  from './layout/header.component';
import { FooterComponent }  from './layout/footer.component';

import { CommonService } from './services/common.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
  <router-outlet></router-outlet>
  `
})
export class AppComponent {

  constructor(
    private commonService: CommonService, /* Init CommonService at singleton service */
  ){
    
  }
}