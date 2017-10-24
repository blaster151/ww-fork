import { Injectable } from '@angular/core';
import { ICellWithCoordinates } from './ww.interfaces';

@Injectable()
export class BandDrawerService {

  constructor() { }

  renderProperlySizedBand(coords: ICellWithCoordinates[], gridPixelSize: number, cellSizePixels: number, isDiagonal: boolean, newOffset: number, wordLength: number): IPaths {
    let selectionTopPosition = Math.min(...coords.map(c => c.row)) - 1;
    let selectionLeftPosition = Math.min(...coords.map(c => c.col)) - 1;

    let heightOfBand = (1 * cellSizePixels);

    if (isDiagonal)
      heightOfBand *= .7;

    let circleOutcurveDistance = gridPixelSize / 18.75;
    let circleCurveAmount = circleOutcurveDistance / 2;
    let padInward = circleOutcurveDistance / 2;

    const selectionHeight = (padInward / 10);

    const renderProperlySizedBand2 = (): IPaths => {
      const topOfBand = (selectionTopPosition * cellSizePixels) + (cellSizePixels / 2) - (heightOfBand / 2);
      const determineOpeningHalfCircle = () => {
        let startingTop = topOfBand;
        let startingLeft = (selectionLeftPosition * cellSizePixels) + padInward;

        startingTop += newOffset; startingLeft += newOffset;

        const circleMidpointIncrement = (heightOfBand) / 3;

        let circleMidpoint1 = { pos1: startingLeft - circleOutcurveDistance, pos2: startingTop + circleMidpointIncrement - circleCurveAmount };
        const circleMidpoint2 = { pos1: startingLeft - circleOutcurveDistance, pos2: startingTop + (circleMidpointIncrement * 2) + circleCurveAmount };

        const endingPosition = startingTop + (heightOfBand);

        return `M${startingLeft} ${startingTop}  C${circleMidpoint1.pos1} ${circleMidpoint1.pos2}  
            ${circleMidpoint2.pos1} ${circleMidpoint2.pos2} ${startingLeft} ${endingPosition}`;
      };

      const determineFirstLine = () => {
        let startingTop = topOfBand;
        let startingLeft = (selectionLeftPosition * cellSizePixels) + padInward;

        startingTop += newOffset;
        startingLeft += newOffset;

        return `M${startingLeft} ${startingTop}    ${(((selectionLeftPosition + wordLength) * cellSizePixels) - padInward) + newOffset} ${startingTop}`;
      };

      const determineClosingHalfCircle = () => {
        let startingTop = topOfBand;
        let startingLeft = ((selectionLeftPosition + wordLength) * cellSizePixels) - padInward;
        startingTop += newOffset; startingLeft += newOffset;

        const circleMidpointIncrement = (heightOfBand) / 3;

        const circleMidpoint1 = { pos1: startingLeft + circleOutcurveDistance, pos2: startingTop + circleMidpointIncrement - circleCurveAmount };
        const circleMidpoint2 = { pos1: startingLeft + circleOutcurveDistance, pos2: startingTop + (circleMidpointIncrement * 2) + circleCurveAmount };

        const endingPosition = startingTop + (heightOfBand);

        return `M${startingLeft} ${startingTop}    C${circleMidpoint1.pos1} ${circleMidpoint1.pos2}    ${circleMidpoint2.pos1} ${circleMidpoint2.pos2} ${startingLeft} ${endingPosition}`;
      };

      const determineSecondLine = () => {
        let startingY = topOfBand + heightOfBand;

        let startingX = ((selectionLeftPosition + wordLength) * cellSizePixels) - padInward;
        startingX += newOffset; startingY += newOffset;

        return `M${startingX} ${startingY}    ${(((selectionLeftPosition) * cellSizePixels)) + padInward + newOffset} ${startingY}`;
      };

      return {
        path1: determineOpeningHalfCircle(),
        path2: determineFirstLine(),
        path3: determineClosingHalfCircle(),
        path4: determineSecondLine()
      };
    };
    return renderProperlySizedBand2();
  }
}

interface IPaths {
  path1: string;
  path2: string;
  path3: string;
  path4: string;
}