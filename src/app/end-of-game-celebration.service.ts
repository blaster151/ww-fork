import { Injectable, ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Puzzle } from './models/puzzle';

@Injectable()
export class EndOfGameCelebrationService {
  public vcRef: ViewContainerRef;
  constructor(overlay: Overlay, public modal: Modal) {

  }

  celebrate(secretWord: string) {
    const modal = this.modal.alert()
      .size('lg')
      .showClose(true)
      .title(`Puzzle Complete`)
      .body(`<p><app-logo></app-logo>This puzzle has been finished!</p>`);

    const modalPromise = modal.open()
      .then(result => {
        setTimeout(() => {
         result.close();

         const secondModal = this.modal.alert()
            .size('lg')
            .showClose(true)
            .title(`Puzzle Complete`)
            .body(`<p>Second modal!  The secret word is ${secretWord}.</p>`);

          secondModal.open().then(result2 => {
            setTimeout(function() {
              result2.close();
            }, 1000);
          });
        }, 1000);
      });
  }

  offerToReset(puzzle: Puzzle) {
    const promise = new Promise<boolean>((res, rej) => {
    const modal = this.modal.alert()
      .size('lg')
      .showClose(true)
      .title(`Puzzle Complete`)
      .body(`<p><app-logo></app-logo>You have completed this puzzle.  Would you like to restart?</p>`)
      .okBtnClass('hidden')
      .addButton('btn btn-primary', 'Yes', (r) => {
        res(true);

        r.dialog.close();
      })
      .addButton('btn btn-secondary', 'No', (r) => {
        res(false);
        r.dialog.close();
      });

    modal.open();
    });

    return promise;
  }
}
