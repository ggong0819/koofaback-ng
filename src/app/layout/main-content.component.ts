import { Component, ViewChild } from '@angular/core';

import { CommonComponent} from '../common/component'
import { ModalDirective } from 'ngx-bootstrap';


@Component({
  moduleId: module.id,
  selector: 'main-content',
  templateUrl: 'main-content.component.html',
})
export class MainContentComponent{
  public menu = {
    category : '홈',
    menu : '홈',
  };
}