import { Directive, ElementRef, Input, Renderer, OnInit } from '@angular/core';
import { WordSelectionStateService } from './word-selection-state.service';
import { ICellWithCoordinates } from './ww.interfaces';

@Directive({
    selector: '[appCell]'
})
export class CellDirective implements OnInit {
    @Input() public cellcontents: ICellWithCoordinates;
    private element: ElementRef;
    private wordSelectionStateService: WordSelectionStateService;

    private controlSchemes: { move: string, up: string, down: string }[];
    constructor(element: ElementRef, wordSelectionStateService: WordSelectionStateService, private renderer: Renderer) {
        this.element = element;
        this.wordSelectionStateService = wordSelectionStateService;

        this.controlSchemes = [
            { move: 'mousemove', up: 'mouseup', down: 'mousedown' },
            { move: 'touchmove', up: 'touchend', down: 'touchstart' }
        ];
    }

    private wireUpHandler() {
        const body = document.querySelector('body');

        if (body.getAttribute('data-gridwired') !== 'true') {
            body.setAttribute('data-gridwired', 'true');

            this.controlSchemes.forEach((controlScheme) => {
                body.addEventListener(controlScheme.up, (evt) => {
                    if (this.wordSelectionStateService.isSelectingWord)
                    {
                        this.wordSelectionStateService.isSelectingWord = false;
                        this.wordSelectionStateService.doneWithWord();
                    }
                });
            });
        }
    }

    private wireDownHandler() {
        this.controlSchemes.forEach((controlScheme) => {
            this.element.nativeElement.addEventListener(controlScheme.down, (evt) => {
                this.wordSelectionStateService.lastElementMovedOver = null;

                this.wordSelectionStateService.isSelectingWord = true;

                evt.stopPropagation();
                evt.preventDefault();
            });
        });
    }

    ngOnInit() {
        this.wireDownHandler();
        this.wireUpHandler();

        this.controlSchemes.forEach((controlScheme) => {
            this.element.nativeElement.addEventListener(controlScheme.move, (evt) => {
                if (!this.wordSelectionStateService.isSelectingWord) {
                    if (evt.buttons === 1)
                    {
                        // Special handling needed - user is entering the grid with
                        // a mouse button already down

                        // Do whatever happens in the "down event"
                        this.wordSelectionStateService.lastElementMovedOver = null;
                        this.wordSelectionStateService.isSelectingWord = true;

                        evt.stopPropagation();
                        evt.preventDefault();
                    }

                    evt.stopPropagation();
                    evt.preventDefault();

                    return false;
                }

                if (evt.changedTouches) {
                    const myLocation = evt.changedTouches[0];
                    const realTarget = document.elementFromPoint(myLocation.clientX, myLocation.clientY);

                    if (realTarget !== this.element.nativeElement) {
                        if ((<any>realTarget).dispatchEvent) {
                            (<any>realTarget).dispatchEvent(<any>new Event(controlScheme.move, {}));
                        }

                        if ((<any>realTarget).trigger) {
                            (<any>realTarget).trigger(controlScheme.move);
                        }
                        else {
                            evt.stopPropagation();
                            evt.preventDefault();
                            return false;
                        }
                    }
                }

                if (!this.sameCellAsBefore())
                {
                    this.wordSelectionStateService.addLetter(this.cellcontents);
                }

                evt.stopPropagation();
                evt.preventDefault();
                return false;
            });
        });
    }

    private sameCellAsBefore(): boolean {
        if (this.wordSelectionStateService.wordBeingSelected.length > 0)
        {
            if (this.cellcontents.cell === this.wordSelectionStateService.wordBeingSelected[this.wordSelectionStateService.wordBeingSelected.length - 1].cell)
            {
                return true;
            }
        }

        return false;
    } 
}
