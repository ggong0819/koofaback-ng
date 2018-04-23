import { Component, Input, Host, OnInit } from '@angular/core';
import { config } from '../config/config';

@Component({
    moduleId: module.id,
    selector: '[menu-tree]',
    templateUrl: 'menu-tree.component.html',
})

export class MenuTreeComponent implements OnInit {
        ngOnInit(): void {
            // console.log(this.menuList);
        }

    @Input() menuList:any;
    @Input() allMenuList:any;

    constructor(
    ){
        
    }


}