import * as phantom from 'phantom';
import * as cp from 'child_process';
import { Promise } from '../../node_modules/es6-promise';

export class PhantomService {

  constructor() { }

  openFrom(url: string): Promise<any> {
    const result = new Promise<any>((res, rej) => {
      phantom.create().then(p => {
        p.createPage().then(page => {
          page.open('url').then(rsp => {
            console.log('page opened with phantom');
            page.close();
            res(null);

            setTimeout(() => {
              console.log('p.exit()');
              p.exit();
            }, 500);
          })
        })
      });
    });

    return result;
  }
}
