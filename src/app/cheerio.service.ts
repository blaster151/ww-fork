import { Injectable } from '@angular/core';
import * as ch from 'cheerio';

@Injectable()
export class CheerioService {
  constructor() { }

  loadDom(html: string) {
    return ch.load(html);
  }
}
