import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDynamicFontSize]'
})
export class DynamicFontSizeDirective {

  constructor(private elementRef: ElementRef) {
    console.log('in ctr of dfsd');
   }

  ngOnInit() {
    console.log('in dynamic FS directive', this.elementRef.nativeElement.offsetHeight);

    setTimeout(() => {
      this.resizeFont();
    }, 100);

    window.addEventListener('resize', () => { setTimeout(() => { this.resizeFont() }, 50) }, false);
  }

  resizeFont() {
    let fontSize = Math.round(this.elementRef.nativeElement.offsetHeight / 22);
    console.log(fontSize);
    this.elementRef.nativeElement.style.fontSize = fontSize + "px";
    this.elementRef.nativeElement.style.lineHeight = fontSize + "px";

  }

}
