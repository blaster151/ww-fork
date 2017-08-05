// import * as phantom from 'phantom';
// import * as cp from 'child_process';
import { Promise } from '../../node_modules/es6-promise';
import { PhantomService, ICookie } from './phantom.service';
import { CheerioService } from './../../src/app/cheerio.service';
import { DomParseService, IParseSettings } from './domParsing.service';

export class JiraService {

  constructor() { }

  get() {
    return this.getAndParse('https://jira.corp.docusign.com/browse/DTRMONT-690',
      {
        topLevelSelector: '.issue-body-content',
        params: {
          status: 'span#status-val',
          assignee: '#assignee-val'
        }
      });
  }

  getAndParse(url: string, settings: IParseSettings): PromiseLike<any> {
    return new Promise<any>((res, rej) => {
      const cookies = <ICookie[]>[];

      cookies.push({
        'name': 'JSESSIONID',
        'value': '7127B94F5F7EC2D750865867D74440FA',
        'domain': 'jira.corp.docusign.com',
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
