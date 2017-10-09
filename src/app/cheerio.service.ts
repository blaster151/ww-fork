import * as ch from 'cheerio';
import { Injectable } from '@angular/core';

@Injectable()
export class CheerioService {
  constructor() { }

  loadDom(html: string) {
    return ch.load(html);
  }
}
