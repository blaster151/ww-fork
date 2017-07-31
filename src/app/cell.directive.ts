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
                        console.log('same');
                    } else {
                        console.log('dispatching');
                       // (<any>realTarget).dispatchEvent(<any>new Event('touchmove', {}));
                    }

                }

                if (true) {
                    if (this.wordSelectionStateService.lastElementMovedOver === this.cellcontents.cell) {
                        evt.stopPropagation();
                        evt.preventDefault();
                        return false;
                    } else {
                        this.wordSelectionStateService.lastElementMovedOver = this.cellcontents.cell;
                    }

                    this.wordSelectionStateService.addLetter(this.cellcontents);
                }

                evt.stopPropagation();
                evt.preventDefault();
                return false;
            });
        });
    }
}
