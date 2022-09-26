import { Directive, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appTableHeader]',
})
export class TableHeaderDirective implements OnChanges {

  @Input()
  public field!: string;

  public ngOnChanges() {
    if (this.field) {
      console.log(this.field);
    }
  }

}
