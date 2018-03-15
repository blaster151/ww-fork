import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "[appFillAllSpaceAvailable]"
})
export class FillAllAvailableSpaceDirective {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    setTimeout(() => {
      console.log("After timeout");
      this.triage();
    }, 100);

    window.addEventListener("resize", () => {
      console.log("in heard resize");
    });

    this.triage();
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

    console.log('setting to desired height ', desiredHeight);
    //this.elementRef.nativeElement.height = desiredHeight;
    this.elementRef.nativeElement.style.height = desiredHeight + "px";
  }
}
