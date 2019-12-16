import { Directive, ElementRef, Input } from "@angular/core";
import { GameInitializationServiceService, LaunchSteps } from "./game-initialization-service.service";

@Directive({
  selector: "[appFillAllSpaceAvailable]"
})
export class FillAllAvailableSpaceDirective {
  constructor(private elementRef: ElementRef, private g: GameInitializationServiceService) {}

  ngOnInit() {
    this.g.orchestrator.subscribe(step => {
      if (step == LaunchSteps.FillAllAvailableSpaceRequested)
      {
        this.triage();
      }
    });
  }

  triage() {
    // What should height be?
    var parentHeight = this.elementRef.nativeElement.parentElement.offsetHeight;
    var thisTop = this.elementRef.nativeElement.offsetTop;
    var desiredHeight = parentHeight - thisTop;

    this.elementRef.nativeElement.style.height = desiredHeight + "px";
  }
}
