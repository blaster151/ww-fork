import { Injectable, ViewContainerRef } from '@angular/core';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Puzzle } from './models/puzzle';

@Injectable()
export class EndOfGameCelebrationService {
  public vcRef: ViewContainerRef;
  constructor(overlay: Overlay, public modal: Modal) {

  }

  celebrate(secretWord: string, puzzle: Puzzle) {
    const interval = 1500;

    const modal = this.modal.alert()
      .size('lg')
      .showClose(false)
      .title(`Puzzle Complete`)
      .body(`<app-logo></app-logo>You found all of the words!`)
      .okBtnClass('hidden')
      .addButton('btn btn-primary', 'Ok', (r) => {
        const secondModal = this.modal.alert()
          .size('lg')
          .showClose(false)
          .title(`Puzzle Complete`)
          .body(`And here's the WONDERWORD!`)
          .okBtnClass('hidden')
          .addButton('btn btn-primary', 'Ok', (r2) => {
            const thirdModal = this.modal.alert()
              .size('lg')
              .showClose(true)
              .title(`Puzzle Complete`)
              .body(`${secretWord}`)
              .okBtnClass('hidden')
              .addButton('btn btn-primary', 'Ok', (r3) => {
                r3.dialog.close();
              }).open();

              r2.dialog.close();
              
              let interval = 0;
              puzzle.rows.forEach(r => r.cells.forEach(c => {
                if (!c.isCircled)
                {
                  interval += 250;
                  setTimeout(() => {
                    c.isHighlighted = true;
                  }, interval);
                }
              }));
          }).open();
          
        r.dialog.close();
      });

    const modalPromise = modal.open();
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
