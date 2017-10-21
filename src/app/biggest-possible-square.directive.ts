import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBiggestPossibleSquare]'
})
export class BiggestPossibleSquareDirective {

  constructor(private elementRef: ElementRef) {
    console.log('in ctr of biggestpossiblesquare');
  }

  ngOnInit() {
    setTimeout(() => {
      this.resizeSquare();
    }, 100);

    window.addEventListener('resize', () => { setTimeout(() => { this.resizeSquare() }, 50) }, false);
  }

  resizeSquare() {
    this.elementRef.nativeElement.style.height = "0px";
    this.elementRef.nativeElement.style.width = "0px";

    // this.inspectSize(this.elementRef.nativeElement);
    // this.inspectSize(this.elementRef.nativeElement.parentNode);
    // this.inspectSize(this.elementRef.nativeElement.parentNode.parentNode);
    // this.inspectSize(this.elementRef.nativeElement.parentNode.parentNode.parentNode);
    // this.inspectSize(this.elementRef.nativeElement.parentNode.parentNode.parentNode.parentNode);
    // this.inspectSize(this.elementRef.nativeElement.parentNode.parentNode.parentNode.parentNode.parentNode);

    let parentHeight = this.elementRef.nativeElement.parentNode.parentNode.offsetHeight;
    let parentWidth = this.elementRef.nativeElement.parentNode.parentNode.offsetWidth;

    let squareSize = Math.max(parentHeight, parentWidth);
    console.log('squareSize', squareSize);
    this.elementRef.nativeElement.style.height = squareSize + "px";
    this.elementRef.nativeElement.style.width = squareSize + "px";
  }

  // inspectSize(element) {
  //   let computedStyle = getComputedStyle(element);

  //   let elementHeight = element.clientHeight;  // height with padding
  //   let elementWidth = element.clientWidth;   // width with padding

  //   elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
  //   elementWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);

  //   console.log(elementHeight, elementWidth);
  // }

}
