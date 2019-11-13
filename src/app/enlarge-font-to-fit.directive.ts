import { Directive, ElementRef } from '@angular/core';
import { GameInitializationServiceService, LaunchSteps } from './game-initialization-service.service';

@Directive({
  selector: '[appEnlargeFontToFit]'
})
export class EnlargeFontToFitDirective {

  private readonly paddingDesired = 10;
  private readonly increment = 0.75; //0.5;

  private hasModifiedFontSizeAtLeastOnce = false;

  constructor(private element: ElementRef, private g: GameInitializationServiceService) { }

  ngOnInit() {
    let interval = setInterval(() => {
      if (this.hasModifiedFontSizeAtLeastOnce) {
        //console.log(' EnlargeFontToFitDirective has already run; clearing itself');
        clearInterval(interval);
      }
      else {
        this.evaluateNeedToIncreaseFontSize();
        //console.log(' EnlargeFontToFitDirective running first time');
      }
    }, 125);
  }

  private iterations = 0;
  evaluateNeedToIncreaseFontSize() {
    // Get actual height
    let heightInformation = this.getHeightInformation();

    if ((heightInformation.actualHeight + this.paddingDesired) < heightInformation.availableHeight) {
      this.hasModifiedFontSizeAtLeastOnce = true;

      this.increaseFontSize();
      this.iterations++;

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

      console.log('total iterations', this.iterations, newSize);
      this.g.orchestrator.next(LaunchSteps.FontDetermined);
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
