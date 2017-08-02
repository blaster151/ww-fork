import { Component, ElementRef, OnInit, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ICellWithCoordinates } from '../ww.interfaces';
import 'rxjs/add/operator/toArray';
import { TimerService } from '../timer.service';
import { style, trigger, state, transition, animate, keyframes } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { BandDrawerService } from '../band-drawer.service';

@Component({
  selector: 'app-word-selection-overlay',
  templateUrl: './word-selection-overlay.component.html',
  styleUrls: ['./word-selection-overlay.component.css'],
  // animations: [trigger('isSelected', [
  //   state('Yes',
  //     style({ opacity: 1 })
  //   ),
  //   state('No',
  //     style({ opacity: 0 })
  //   ),
  //   transition('* => Yes',
  //     animate('500ms ease-in')
  //   )
  // ])]  // animations: [trigger('isSelected', [
  //   state('Yes',
  //     style({ opacity: 1 })
  //   ),
  //   state('No',
  //     style({ opacity: 0 })
  //   ),
  //   transition('* => Yes',
  //     animate('500ms ease-in')
  //   )
  // ])]
})
export class WordSelectionOverlayComponent {
  @Input() public coords: ICellWithCoordinates[];
  @Input() public color = 'purple';

  public isSelected = "No";
  public rotation = 0;
  public transformOffsetX = 0;
  public transformOffsetY = 0;

  public path1: string;
  public path2: string;
  public path3: string;
  public path4: string;

  private newOffset = 100;

  public strokeWidth: number;

  private isDiagonal: boolean;
  public transform: any = "";
  public originShift = "";

  constructor(private element: ElementRef, private sanitizer: DomSanitizer, private bandDrawer: BandDrawerService) {
    this.element = element;
    console.log('in constructor');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['coords']) {
      this.drawSelectionOverlay();
    }
  }
  
  ngOnDestroy() {
    console.log('in destroy');
  }

  private drawSelectionOverlay() {

    // Initialize
    this.isDiagonal = false;
    this.rotation = 0;
    this.newOffset = 100;
    this.path1 = '';
    this.path2 = '';
    this.path3 = '';
    this.path4 = '';
    this.transformOffsetX = 0;
    this.transformOffsetY = 0;
    this.transform = '';
    this.originShift = '';
    let coords = this.coords;
    let svg = this.element.nativeElement.querySelector('svg');
      if (coords === null || coords.length === 0) {
        this.element.nativeElement.style.display = 'none';

        this.isDiagonal = false;
        this.originShift = '';
        this.transform = '';

        return;
      }
      else {
        this.element.nativeElement.style.display = '';
      }

      // TODO - @ViewChild

      let gridSize = 15;
      let selectionTopPosition = Math.min(...coords.map(c => c.row)) - 1;
      let selectionLeftPosition = Math.min(...coords.map(c => c.col)) - 1;
      let selectionRightPosition = Math.max(...coords.map(c => c.col)) - 1;
      let selectionBottomPosition = Math.max(...coords.map(c => c.row)) - 1;
      let selectionWidthInCharacters = Math.max(...coords.map(c => c.col)) - selectionLeftPosition;
      const selectionHeightInCharacters = Math.max(...coords.map(c => c.row)) - selectionTopPosition;

      let isHorizontal = selectionHeightInCharacters === 1 && selectionWidthInCharacters >= 1;
      this.isDiagonal = selectionHeightInCharacters > 1 && selectionWidthInCharacters > 1;
      const isVertical = selectionHeightInCharacters > 1 && selectionWidthInCharacters === 1;

      console.log('hdv', isHorizontal, this.isDiagonal, isVertical);

      let newSvg = this.element.nativeElement.querySelector('.innerSvg');

      //console.log(this.element.nativeElement.style);

      // If this element is styled at 100%, it might not know its own size yet
      let thisElementHeight = this.element.nativeElement.parentNode.clientHeight;  //this.element.nativeElement.style.height;

      let pixelsGridSize = thisElementHeight;//.replace('px', '');
      let cellSizePixels = pixelsGridSize / gridSize;


      let wordLength = Math.max(selectionHeightInCharacters, selectionWidthInCharacters);


      //heightOfBand *= 2;






      let bandPaths = this.bandDrawer.renderProperlySizedBand(coords, cellSizePixels, this.isDiagonal, this.newOffset, wordLength);
      this.path1 = bandPaths.path1;
      this.path2 = bandPaths.path2;
      this.path3 = bandPaths.path3;
      this.path4 = bandPaths.path4;

      // Repeated
      let circleOutcurveDistance = 20;
      let padInward = circleOutcurveDistance / 2;

      // Rotate if necessary
      let startingTop = selectionTopPosition * cellSizePixels;
      let startingLeft = (selectionLeftPosition * cellSizePixels) + padInward;

      startingLeft += this.newOffset; startingTop += this.newOffset;

      // I don't really know if this is appropriate use of padInward
      if (isVertical) {
        const rotation = 90;
        startingTop += (padInward / 10);
        newSvg.style = `transform: rotate(${rotation}deg); transform-origin: ${startingLeft + 3}px ${startingTop + padInward + 4}px`;
      }
      else
        {}

      if (this.isDiagonal) {
        // The line looks too thick after css scaling
        this.strokeWidth = 3.2;
      }
      else {
        this.strokeWidth = 5;
      }

      if (this.isDiagonal) {
        const rotateTransformTop = 0;
        const rotateTransformLeft = 0;

        // DR

        // UR
        const up = this.coords[1].row < this.coords[0].row;
        const right = this.coords[1].col > this.coords[0].col;
        const down = !up;
        const left = !right;



        if (down && right) {
          this.rotation = 45;

        }
        else if (up && right) {

          console.log("UR");

          this.rotation = -45;
        }
        else if (up && left) {
          // UL
          console.log("UL");
          this.rotation = 45;// -135;

        }
        else if (down && left) {
          console.log("DL");
          this.rotation = -45;
        }

        this.transformOffsetX = cellSizePixels * (selectionLeftPosition);
        this.transformOffsetX += (cellSizePixels / 2);

        this.transformOffsetY = cellSizePixels * (selectionTopPosition);
        this.transformOffsetY += (cellSizePixels / 2);

        this.transformOffsetX += this.newOffset;
        this.transformOffsetY += this.newOffset + (padInward / 10);

        if ((down && left) || (up && right)) {
          //console.log("DL UR ", this.rotation, selectionLeftPosition, selectionBottomPosition);

          this.transformOffsetX = cellSizePixels * (selectionRightPosition);
          this.transformOffsetX += (cellSizePixels / 2);

          this.transformOffsetY = cellSizePixels * (selectionTopPosition);
          this.transformOffsetY += (cellSizePixels / 2);

          this.transformOffsetX += this.newOffset;
          this.transformOffsetY += this.newOffset + (padInward / 10);
        }

        this.calculateDiagonalTransform();

    }
      else
        {
          // Do we need to reset the transform?
          this.transform = '';
        }

    console.log('r', this.rotation);
    console.log('st, sl', startingTop, startingLeft);
    console.log(this.transform);
    console.log(this.originShift);
  }

  calculateDiagonalTransform() {
    if (this.isDiagonal) {
      this.transform = this.sanitizer.bypassSecurityTrustStyle(`scale(1.4) rotate(${this.rotation}deg)`);
      this.originShift = `${this.transformOffsetX}px ${this.transformOffsetY}px`;
    }
  }
}
