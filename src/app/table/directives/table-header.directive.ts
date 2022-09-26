import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[appTableHeader]',
})
export class TableHeaderDirective implements  OnChanges {

  @Input()
  public field!: string;

  constructor() {
  }

  public ngOnChanges() {
    debugger
    if (this.field) {
      console.log(this.field);
    }
  }

}
