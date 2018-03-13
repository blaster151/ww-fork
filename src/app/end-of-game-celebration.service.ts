import { Injectable, ViewContainerRef } from '@angular/core';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Puzzle } from './models/puzzle';

@Injectable()
export class EndOfGameCelebrationService { 
  public vcRef: ViewContainerRef;
  constructor(overlay: Overlay, public modal: Modal) {

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
