import { CheerioService } from './cheerio.service';
import { AxiosService } from './axios.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UrlLoaderService {

  constructor(private axiosService: AxiosService, private cheerioService: CheerioService) { }

  getFromUrl(url: string) {
    return new Promise<CheerioStatic>((res, rej) => {
      this.axiosService.getUrlContents(url)
        .then(rsp => {
          const $ = this.cheerioService.loadDom(rsp);
          res($);
        }, (error) => rej(error));
    });
  }

  parseFromUrl(url: string, topSelector: string, transformPattern: {}) {
    return new Promise((res, rej) => {
      this.getFromUrl(url).then($ => {
        res(this.parse($, topSelector, transformPattern));
      });
    });
  }

  parse($: CheerioStatic, topSelector: string, transformPattern: {}) {
    const results = [];
    $(topSelector).each((i, e) => {
      const newObj = <any>{};

      Object.keys(transformPattern).forEach(key => {
        try {
          newObj[key] = transformPattern[key](e);
        }
        // tslint:disable-next-line:one-line
        catch (e) {}
      });

      results.push(newObj);
    });

    return results;
  }
}
