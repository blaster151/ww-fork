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
    }, 50);

    window.addEventListener('resize', () => { setTimeout(() => { this.resizeSquare() }, 50) }, false);
  }

  resizeSquare() {
    this.elementRef.nativeElement.style.height = "0px";
    this.elementRef.nativeElement.style.width = "0px";

    let parentHeight = this.elementRef.nativeElement.parentNode.parentNode.offsetHeight;
    let parentWidth = this.elementRef.nativeElement.parentNode.parentNode.offsetWidth;

    let squareSize = Math.max(parentHeight, parentWidth);

    this.elementRef.nativeElement.style.height = squareSize + "px";
    this.elementRef.nativeElement.style.width = squareSize + "px";
  }
}
