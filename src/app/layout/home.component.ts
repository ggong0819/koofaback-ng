import { Component,OnInit } from '@angular/core';

declare function reloadHeight(): void;



@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit{
  private isLogin = true;

  public menu = {
    category : '홈',
    menu : '홈',
  };

  
  ngOnInit(): void {
    reloadHeight();
  }
}