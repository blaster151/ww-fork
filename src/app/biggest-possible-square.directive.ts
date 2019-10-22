import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBiggestPossibleSquare]'
})
export class BiggestPossibleSquareDirective {

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.resizeSquare();
    }, 120);

    // window.addEventListener('resize', () => {
    //   console.log('Resize handler: BiggestPossibleSquareDirective');
    //   setTimeout(() => {
    //     this.resizeSquare()
    //   }, 120)
    // }, false);
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
