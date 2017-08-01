import * as ch from 'cheerio';

export class CheerioService {
  constructor() { }

  loadDom(html: string) {
    return ch.load(html);
  }
}
