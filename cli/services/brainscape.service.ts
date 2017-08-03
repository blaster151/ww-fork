// import * as phantom from 'phantom';
// import * as cp from 'child_process';
import { Promise } from '../../node_modules/es6-promise';
import { PhantomService, ICookie } from './phantom.service';
import { CheerioService } from './../../src/app/cheerio.service';

export class BrainscapeService {

  constructor() { }

  getDeck(deckId: string) {
    return this.getAndParse('https://www.brainscape.com/flashcards/enneagram-own-6108502/packs/' + deckId,
      {
        topLevelSelector: 'section.card',
        params: {
          number: 'div.card-number',
          question: 'h2.card-question-text',
          answer: 'h3.card-answer-text'
        }
      });
  }

  getSubjects() {
    return this.getAndParse('https://www.brainscape.com/packs', {
      topLevelSelector: '.navlist li',
      params: {
        name: 'h4',
        progress: '.progress span',
        link: { selector: 'a', attribute: 'rel' }
      }
    });
  }

  getDecksForSubject(subject: string) {
    return this.getAndParse('https://www.brainscape.com/library/' + subject,
    {
      topLevelSelector: 'tr.decklist-item',
      params: {
        name: 'a.decklist-name',
        stats: 'small.text-muted',
        mastery: 'strong.decklist-mastery strong',
        id: { selector: 'a.decklist-name', attribute: 'rel' }
      }
    });
  }

  getAndParse(url: string, settings: IParseSettings): PromiseLike<any> {
    return new Promise<any>((res, rej) => {
      const cookies = <ICookie[]>[];

      cookies.push({
        'name': '_Brainscape_session_1',
        'value': 'Z2FHTFhya2lNWlVKWElWT2VhZU5sZUVWV25BVUFxWmlnWGpKcGprUWdLek9aWlpNYmx3NCtKSVVKZVAyTStJQ25qVGRidmdaYWc4TDMyMDdnM3FSTURCWWlBUG9lNVhVTDJCWGpzYUhxSWtmUHRUZHdpOHBwMHlSc2NUQlBBNVg0WFZvd05MSXc0dUJRaUlrVXpQdVIwaGQ0OEZKMFJLaHNlUlNOQVNVanFLcmo0Wmp2Zlp6Mno0ZGxic2dHd2VaN3FWZHlZTEMwcm15ejMyTW9wSFRsbTRWbEZydXNqREJmYnR5bUZudmlnSFNrbTZXdGRHRW9UdXlsNVRFdi9BZlJqM0xaV0RJdWRhL2Q1T3lXZ1FZdXdoL2M3MHhJaW9odllwTHFKaVpnVUNuY3gvZ2R5eWVhNEJEMVhuOVR1RE4zRG52akxsSEQ2b0dWcXE0SHdaaU9SbzJvMGtmK3VQaXM5WWJQQWNmTytoOXpwQ0JhWTN6TEZEWlZoMnlDSC9UVkQ0cE1xQlJ6QzNZb0s5dFpMWmUzT3E0Y3ZocThJL0hkeHJnZHdBTlZaUnF1UmZnUjBaWU8yYVZZa2hCRjJQVFAyN1o5TVNVOUlkeEVxZ3hndDUrMzJEMzQvMHhjaXlpYlJRN29Gb2EwbVJyT0VuOGFiemh0U0RqR2xtcEtqakFpR1JPUnY0ZTlhdk85SWNiY2d4aUdYNmpOYzVBM2lFRmtTdzlMd001Vm5mQjh5VVNLSkN0dEFlTm92QU10aC83bTZUQlJHSk9vY2RVTUdZWllIaVd4TXZVYUYrdjRlc0ZOK016MUxVem5qVT0tLThZV2gvY2RjN084NFFwL3AxeHFpSVE9PQ',
        'domain': '.www.brainscape.com',
        path: '/'
      });
      cookies.push({
        name: 'bs_users%2Fuser_credentials',
        value: '9f6e7c4ffd7a7d17b51e0e1f0b62f2c9eb0161c1b4f1217943ec57b710fe52bf39d91bff6deff00fae418996d2f628e370e0adf9e5ff43d88563784bb6a70388%3A%3A2731938',
        domain: '.www.brainscape.com',
        path: '/'
      });

      new PhantomService().openFrom(url, cookies)
        .then(rsp => {
          const $ = new CheerioService().loadDom(rsp);
          const results = new DomParseService($).parse(settings);

          res(results);
        });
      });
  }
}

class DomParseService {
  constructor(private $: CheerioStatic) {
  }

  parse(settings: IParseSettings) {
    const results = [];
    this.$(settings.topLevelSelector).each((i, card) => {
      const cardDom = this.$(card);

      const result = {};

      Object.keys(settings.params).forEach(key => {
        let value = null;

        if (settings.params[key].selector)
        {
          value = this.$(cardDom.find(settings.params[key].selector)[0])
              .attr(settings.params[key].attribute);
        }
        else
        {
          value = this.$(cardDom.find(settings.params[key])[0])
              .text()
              .replace(/(?:\r\n|\r|\n)/g, '');
        }

        result[key] = value;
      });
      results.push(result);
    });

    return results;
  }
}

interface IParseSettings {
  topLevelSelector: string;
  params: {};
}




    // new PhantomService().openFrom('https://www.brainscape.com/packs/new-9328108')
    //   .then(rsp => {
    //     const $ = new CheerioService().loadDom(rsp);
    //     const settings: IParseSettings = {
    //       topLevelSelector: 'li.deck-bar',
    //       params: {
    //         name: 'h4.deck-name',
    //         stats: 'div.stats'
    //       }
    //     };