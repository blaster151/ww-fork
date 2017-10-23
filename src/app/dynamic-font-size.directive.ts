import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appDynamicFontSize]'
})
export class DynamicFontSizeDirective {
  @Input('appDynamicFontSize') ratio: number;
  @Input('setbody') setbody: boolean;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    console.log('in dynamic FS directive', this.elementRef);
    console.log('in dynamic FS directive', this.elementRef.nativeElement);
    console.log('in dynamic FS directive', this.elementRef.nativeElement.offsetHeight);
    console.log('in ngOnInit of dfsd', this.ratio);
    if (!this.ratio)
      this.ratio = .1;

    setTimeout(() => {
      this.resizeFont();
    }, 100);

    let setBodyAttribute = this.elementRef.nativeElement.getAttribute('setbody');
    console.log('setBodyAttribute',setBodyAttribute);
    console.log(this.setbody);
    if (setBodyAttribute)
    {
      console.log('discerned setBody');

    } 
    window.addEventListener('resize', () => { setTimeout(() => { this.resizeFont() }, 50) }, false);
  }

  resizeFont() {
    // Discern somehow whether we're in portrait mode
    let ratioToUse = this.ratio * 0.6;

    let fontSize = Math.round(document.querySelector("body").offsetHeight * ratioToUse);//this.elementRef.nativeElement.offsetHeight
    console.log('font size ', fontSize);
    this.elementRef.nativeElement.style.fontSize = fontSize + "px";
    //this.elementRef.nativeElement.style.lineHeight = fontSize + "px";
    console.log('body ', document.querySelector("body").offsetHeight);

    if (this.setbody)
    {
      document.querySelector("body").style.fontSize = fontSize + "px";
      console.log('body px set');
    }
  }
}
