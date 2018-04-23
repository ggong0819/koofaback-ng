import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'alert-modal',
    templateUrl: 'alert-modal.component.html'
})

export class AlertModalComponent {

    @ViewChild('alertModal') public alertModal:ModalDirective;

    alertModalMsg = "";

    constructor() { }

    showAlertModal(message:string):void {
        this.alertModalMsg = message;
        this.alertModal.show();
    }
    
    hideAlertModal():void {
        this.alertModal.hide();
    }
}