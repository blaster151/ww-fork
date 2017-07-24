import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

@Injectable()
export class AxiosService {
  getUrlContents(url: string) {
    const result = new Promise<string>((res, rej) => {
      axios.get(url).then(rsp => {
          res(rsp.data);
      }, function(err) { rej(err); });
    });

    return result;
  }
}
