import * as phantom from 'phantom';
import * as cp from 'child_process';
import { Promise } from '../../node_modules/es6-promise';

export class PhantomService {

  constructor() { }

  openFrom(url: string, cookies: ICookie[]): Promise<any> {
    const result = new Promise<any>((res, rej) => {
      phantom.create().then(p => {
        p.createPage().then(page => {
          cookies.forEach(c => page.addCookie(c));

          page.open(url).then((rsp) => {
            setTimeout(() => {
              res(page.property('content'));
              page.render('screen.jpg');
              page.close();
            }, 0);

            setTimeout(() => {
              p.exit();
            }, 500);
          })
        })
      });
    });

    return result;
  }
}

export interface ICookie {
  name: string,
  value: string,
  domain: string,
  path: string
}