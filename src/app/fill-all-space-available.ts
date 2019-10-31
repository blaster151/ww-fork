import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "[appFillAllSpaceAvailable]"
})
export class FillAllAvailableSpaceDirective {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    setTimeout(() => {
      this.triage();
    }, 100);

    this.elementRef.nativeElement.addEventListener('resize', () => {
      console.log('JCB FillAllAvailableSpaceDirective Resize handler ON ELEMENT');
    });
  }

  triage() {
//     console.log('in triage');
//     console.log(this.elementRef.nativeElement.height);
//     console.log(this.elementRef.nativeElement.style.height);
//     console.log(this.elementRef.nativeElement.offsetHeight);
//     console.log(this.elementRef.nativeElement.parentElement.offsetHeight);
//     console.log(this.elementRef.nativeElement.parentElement.parentElement.offsetHeight);
// console.log('this top', this.elementRef.nativeElement.offsetTop);

    // What SHOULD height be?
    var parentHeight = this.elementRef.nativeElement.parentElement.offsetHeight;
    var thisTop = this.elementRef.nativeElement.offsetTop;
    var desiredHeight = parentHeight - thisTop;

    //this.elementRef.nativeElement.height = desiredHeight;
    this.elementRef.nativeElement.style.height = desiredHeight + "px";
  }
}
