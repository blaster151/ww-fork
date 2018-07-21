import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appEnlargeFontToFit]'
})
export class EnlargeFontToFitDirective {

  private readonly paddingDesired = 10;
  private readonly increment = 0.25; //0.5;

  constructor(private element: ElementRef) { }

  ngOnInit() {
    setTimeout(() => {
      this.evaluateNeedToIncreaseFontSize();
    }, 100);
  }

  evaluateNeedToIncreaseFontSize() {
    // Get actual height
    let heightInformation = this.getHeightInformation();

    if ((heightInformation.actualHeight + this.paddingDesired) < heightInformation.availableHeight) {
      this.increaseFontSize();

      // This stepping function used to need a timeout!
      this.evaluateNeedToIncreaseFontSize();
    }
    else {
      // Decrement and be done
      let existingSize: string = this.element.nativeElement.style.fontSize;

      // console.log('existingsize', existingSize, this.element.nativeElement.style, this.element.nativeElement);

      existingSize = existingSize.replace('px', '');

      let newSize = parseFloat(existingSize) - this.increment;
      this.element.nativeElement.style.fontSize = newSize + 'px';
    }
  }

  getHeightInformation() {
    var actualHeight = 0;
    var availableHeight = 0;

    if (document.createRange) {
        var range = document.createRange();
        range.selectNodeContents(this.element.nativeElement.parentNode);
        if (range.getBoundingClientRect) {
            var rect = range.getBoundingClientRect();
            if (rect) {
                actualHeight = rect.bottom - rect.top;
                availableHeight = this.element.nativeElement.parentNode.offsetHeight;
            }
        }
    }

    return { actualHeight, availableHeight };
  }

  increaseFontSize() {
    let existingSize: string = this.element.nativeElement.style.fontSize;

    existingSize = existingSize.replace('px', '');

    let newSize = parseFloat(existingSize) + this.increment;
    this.element.nativeElement.style.fontSize = newSize + 'px';
  }
}
