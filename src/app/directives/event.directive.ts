import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[dynamic-event]'
})

export class EventDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}