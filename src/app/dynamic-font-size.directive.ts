import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appDynamicFontSize]'
})
export class DynamicFontSizeDirective {
  @Input('appDynamicFontSize') ratio: number;
  @Input('setbody') setbody: boolean;
  private portraitMode = false;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    console.log('orientation');
    console.log(window);

    this.detectPortraitMode();

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
    window.addEventListener('resize', () => { setTimeout(() => { this.detectPortraitMode(); this.resizeFont() }, 50) }, false);
  }

  private detectPortraitMode() {
    if (window.innerHeight > window.innerWidth){
      this.portraitMode = true;
    }
  }

  private getInitialBodyHeight() {
    let bodyHeight = document.querySelector("body").offsetHeight;

    console.log('bodyheight ', bodyHeight);
    return bodyHeight;
  }
  resizeFont() {
    // Discern somehow whether we're in portrait mode
    let ratioToUse = this.ratio * 1.1;  // Default to landscape

    // Adjust for portrait mode
    if (this.portraitMode)
    {
      console.log('adjusting for portrait mode');
      ratioToUse *= 1.0;
    }

    let fontSize = Math.round(this.getInitialBodyHeight() * ratioToUse);//this.elementRef.nativeElement.offsetHeight
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
