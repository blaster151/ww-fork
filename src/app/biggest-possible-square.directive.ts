import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBiggestPossibleSquare]'
})
export class BiggestPossibleSquareDirective {
  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.resizeSquare();
  }

  resizeSquare() {
    let parentHeight = this.elementRef.nativeElement.parentNode.parentNode.offsetHeight;
    let parentWidth = this.elementRef.nativeElement.parentNode.parentNode.offsetWidth;

    let squareSize = Math.max(parentHeight, parentWidth);

    if (parentHeight === 0)
    {
      parentHeight = this.elementRef.nativeElement.parentNode.parentNode.parentNode.offsetHeight;
      parentWidth = this.elementRef.nativeElement.parentNode.parentNode.parentNode.offsetWidth;
      squareSize = Math.max(parentHeight, parentWidth);
    }
    this.elementRef.nativeElement.style.height = "0px";
    this.elementRef.nativeElement.style.width = "0px";

    this.elementRef.nativeElement.style.height = squareSize + "px";
    this.elementRef.nativeElement.style.width = squareSize + "px";
 }
}
