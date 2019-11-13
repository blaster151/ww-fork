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
    this.detectPortraitMode();

    if (!this.ratio)
      this.ratio = .1;

    setTimeout(() => {
      this.resizeFont();
    }, 100);

    let setBodyAttribute = this.elementRef.nativeElement.getAttribute('setbody');
    // window.addEventListener('resize', () => {
    //   console.log('Resize handler: DynamicFontSizeDirective');

    //   setTimeout(() => {
    //     this.detectPortraitMode();
    //     this.resizeFont()
    //   }, 50)
    // }, false);
  }

  private detectPortraitMode() {
    if (window.innerHeight > window.innerWidth){
      this.portraitMode = true;
    }

//    console.log('detectPortraitMode says ', JSON.stringify(this.portraitMode));
  }

  private getInitialBodyHeight() {
    let bodyHeight = document.querySelector("body").offsetHeight;
    let bodyWidth = document.querySelector("body").offsetWidth;
    
    return Math.min(bodyHeight, bodyWidth);
  }
  
  resizeFont() {
    // Discern somehow whether we're in portrait mode
    let ratioToUse = this.ratio * 1.0;  // Default to landscape

    // Adjust for portrait mode
    if (this.portraitMode)
    {
      ratioToUse = this.ratio * 1.0;
    }

    let fontSize = Math.round(this.getInitialBodyHeight() * ratioToUse);
    this.elementRef.nativeElement.style.fontSize = fontSize + 'px';
    this.elementRef.nativeElement.style.lineHeight = fontSize + 'px';

    if (this.setbody)
    {
      document.querySelector('body').style.fontSize = fontSize + 'px';

      // Make the line-height slightly larger than the font size
      document.querySelector('body').style.lineHeight = (fontSize * 1.2) + 'px';
    }
  }
}
