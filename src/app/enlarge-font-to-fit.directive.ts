import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appEnlargeFontToFit]'
})
export class EnlargeFontToFitDirective {

  private readonly paddingDesired = 10;
  private readonly increment = 0.5;

  constructor(private element: ElementRef) { }

  ngOnInit() {
    setTimeout(() => {
      this.evaluateNeedToIncreaseFontSize();
    }, 100);
  }

  evaluateNeedToIncreaseFontSize() {
      // Get actual height
      let actualHeight = this.getActualHeight();
      let availableHeight = this.getAvailableHeight();

      if ((actualHeight + this.paddingDesired) < availableHeight)
      {
        console.log('incrementing');
        this.increaseFontSize();
        setTimeout(() => {
          this.evaluateNeedToIncreaseFontSize();
        }, 0);
      }
      else 
      {
        // Decrement and be done
        let existingSize: string = this.element.nativeElement.style.fontSize;
        
            // console.log('existingsize', existingSize, this.element.nativeElement.style, this.element.nativeElement);
        
            existingSize = existingSize.replace('px', '');
        
            let newSize = parseFloat(existingSize) - this.increment;
            this.element.nativeElement.style.fontSize = newSize + 'px';
        
            console.log('existingSize new', this.element.nativeElement.style.fontSize);
      }
  }

  getActualHeight() {
    var height = 0;
    if (document.createRange) {
        var range = document.createRange();
        range.selectNodeContents(this.element.nativeElement.parentNode);
        if (range.getBoundingClientRect) {
            var rect = range.getBoundingClientRect();
            if (rect) {
                height = rect.bottom - rect.top;
                // console.log('existingSize actual height', height);
                // console.log('existingSize actual elem height', this.element.nativeElement.parentNode.offsetHeight);
            }
        }
    }

    return height;
  }

  getAvailableHeight() {
    var availableHeight = 0;
    if (document.createRange) {
        var range = document.createRange();
        range.selectNodeContents(this.element.nativeElement.parentNode);
        if (range.getBoundingClientRect) {
            var rect = range.getBoundingClientRect();
            if (rect) {
                availableHeight = this.element.nativeElement.parentNode.offsetHeight;
                // console.log('existingSize actual height', availableHeight);
                // console.log('existingSize actual elem height', this.element.nativeElement.parentNode.offsetHeight);
            }
        }
    }

    return availableHeight;
  }

  increaseFontSize() {
    let existingSize: string = this.element.nativeElement.style.fontSize;

    console.log('existingsize', existingSize, this.element.nativeElement.style, this.element.nativeElement);

    existingSize = existingSize.replace('px', '');

    let newSize = parseFloat(existingSize) + this.increment;
    this.element.nativeElement.style.fontSize = newSize + 'px';

    console.log('existingSize new', this.element.nativeElement.style.fontSize);
  }
}
