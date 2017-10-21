import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appDynamicFontSize]'
})
export class DynamicFontSizeDirective {
  @Input('appDynamicFontSize') ratio: number;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    console.log('in dynamic FS directive', this.elementRef.nativeElement.offsetHeight);
    console.log('in ngOnInit of dfsd', this.ratio);
    if (!this.ratio)
      this.ratio = .1;

    setTimeout(() => {
      this.resizeFont();
    }, 100);

    window.addEventListener('resize', () => { setTimeout(() => { this.resizeFont() }, 50) }, false);
  }

  resizeFont() {
    let fontSize = Math.round(document.querySelector("body").offsetHeight * this.ratio);//this.elementRef.nativeElement.offsetHeight
    console.log('font size ', fontSize);
    this.elementRef.nativeElement.style.fontSize = fontSize + "px";
    //this.elementRef.nativeElement.style.lineHeight = fontSize + "px";
    console.log('body ', document.querySelector("body").offsetHeight);
  }

}
