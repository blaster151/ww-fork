// import * as phantom from 'phantom';
// import * as cp from 'child_process';
// import { Promise } from '../../node_modules/es6-promise';
import { PhantomService } from './phantom.service';
import { CheerioService } from './../../src/app/cheerio.service';

export class BrainscapeService {

  constructor() { }

  get() {
    new PhantomService().openFrom('https://www.brainscape.com/flashcards/enneagram-own-6108502/packs/9328108')
      .then(rsp => {

        const $ = new CheerioService().loadDom(rsp);
        const results = [];
        $('section.card').each((i, card) => {
          const cardDom = $(card);

          results.push( {
            number: $(cardDom.find('div.card-number')[0]).text(),
            question: $(cardDom.find('h2.card-question-text')[0]).text(),
            answer: $(cardDom.find('h3.card-answer-text')[0]).text()
          } );
        });

        console.log(results[0]);
      });
  }
}
