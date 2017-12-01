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

    constructor(element: ElementRef, wordSelectionStateService: WordSelectionStateService, private renderer: Renderer) {
        this.element = element;
        this.wordSelectionStateService = wordSelectionStateService;
    }

    private wireMouseUp() {
        const body = document.querySelector('body');

        if (body.getAttribute('data-gridwired') !== 'true') {
            body.setAttribute('data-gridwired', 'true');

            'mouseup touchend'.split(' ').forEach((evtType) => {
                body.addEventListener(evtType, (evt) => {
                    if (this.wordSelectionStateService.isSelectingWord)
                    {
                        this.wordSelectionStateService.isSelectingWord = false;
                        this.wordSelectionStateService.doneWithWord();
                    }
                });
            });
        }
    }

    ngOnInit() {
        'mousedown touchstart'.split(' ').forEach((evtType) => {
            this.element.nativeElement.addEventListener(evtType, (evt) => {
                this.wordSelectionStateService.lastElementMovedOver = null;

                this.wordSelectionStateService.isSelectingWord = true;

                evt.stopPropagation();
                evt.preventDefault();
            });
        });

        this.wireMouseUp();

        'mousemove touchmove'.split(' ').forEach((evtType) => {

            this.element.nativeElement.addEventListener(evtType, (evt) => {
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
                            (<any>realTarget).dispatchEvent(<any>new Event('touchmove', {}));

                           if ((<any>realTarget).trigger) {
                            //console.log('realTarget has a dispatchEvent AND it also has trigger');
                            (<any>realTarget).trigger("touchmove");
                           }
                           else {
                               //console.log('weird short circuit - does this make selection work again?');
                               evt.stopPropagation();
                               evt.preventDefault();
                               return false;

                           }

                       }
                       else {
                           if ((<any>realTarget).trigger)
                            {
                                //console.log('realTarget has no dispatchEvent but it does have trigger');
                                (<any>realTarget).trigger("touchmove");
                            }
                       }
                    }

                }

                this.wordSelectionStateService.addLetter(this.cellcontents);

                evt.stopPropagation();
                evt.preventDefault();
                return false;
            });
        });
    }
}
