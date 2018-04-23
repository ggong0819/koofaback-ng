import { Component } from '@angular/core';
import { config } from '../config/config';
import { MenuTreeComponent } from './menu-tree.component';
import { AuthService } from '../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'left-side',
  templateUrl: 'left-side.component.html',
})

export class LeftSideComponent{
  private menuList : any;
  private userInfo : any;

  constructor(
    private authService : AuthService
  ){

    this.userInfo = authService.getUserInfo();

    //console.log('left-side this.userInfo', this.userInfo)
    //console.log('left-side this.userInfo.menuList', this.userInfo.menuList)

    if(this.userInfo){
      if(this.userInfo.menuList){
        this.menuList = this.userInfo.menuList;
      }
    }
  }
}