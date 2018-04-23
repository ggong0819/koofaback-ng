import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[person]',
})
export class PersonDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
