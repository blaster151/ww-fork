import { CheerioService } from '../../src/app/cheerio.service';

export class DomParseService {
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

export interface IParseSettings {
  topLevelSelector: string;
  params: {};
}
