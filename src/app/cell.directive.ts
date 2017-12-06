import { Directive, ElementRef, Input, Renderer, HostBinding, SimpleChanges, OnInit } from '@angular/core';
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
                    evt.stopPropagation();
                    evt.preventDefault();
                    return false;
                }

                if (evt.changedTouches) {
                    const myLocation = evt.changedTouches[0];
                    const realTarget = document.elementFromPoint(myLocation.clientX, myLocation.clientY);

                    if (realTarget === this.element.nativeElement) {
                        //console.log('same');
                    } else {
                        //console.log('dispatching', realTarget.innerHTML);
                        let a = realTarget.getAttribute("ngReflectCellcontents");
                        //console.log('actual target, we think', JSON.stringify(a));

                       if ((<any>realTarget).dispatchEvent) {
                            (<any>realTarget).dispatchEvent(<any>new Event(controlScheme.move, {}));



                        }

                        if ((<any>realTarget).trigger) {
                            //console.log('realTarget has a dispatchEvent AND it also has trigger');
                            (<any>realTarget).trigger(controlScheme.move);
                        }
                        else {
                            //console.log('weird short circuit - does this make selection work again?');
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
                else 
                {
                    console.log('optimizing away a call to addLetter');
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

        console.log('returned false');
        return false;
    } 
}
