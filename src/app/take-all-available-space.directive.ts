import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTakeAllAvailableSpace]'
})
export class TakeAllAvailableSpaceDirective {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    console.log('TakeAllAvailableSpaceDirective ngOnInit');
    console.log(this.elementRef);

    // What can I access?
    let x = this.elementRef.nativeElement.getBoundingClientRect();
    let y = document.querySelector('body').getBoundingClientRect();
    let z = document.querySelector('html').getBoundingClientRect(); // Also 150

    let myHeight = x.height;
    let bodyHeight = y.height;

    let myIFrame = window.frameElement;
  }
}
