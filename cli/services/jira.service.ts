// import * as phantom from 'phantom';
// import * as cp from 'child_process';
import { Promise } from '../../node_modules/es6-promise';
import { PhantomService, ICookie } from './phantom.service';
import { CheerioService } from './../../src/app/cheerio.service';
import { DomParseService, IParseSettings } from './domParsing.service';

export class JiraService {

  constructor() { }

  getIssue(issueId: string) {
    return this.getAndParse('https://jira.corp.docusign.com/browse/' + issueId, 
      {
        topLevelSelector: '.issue-body-content',
        params: {
          status: 'span#status-val span',
          assignee: '#assignee-val span'
        }
      });
  }

  getOpenIssues() {
    // https://jira.corp.docusign.com/issues/?filter=-1&jql=assignee%20%3D%20currentUser()%20AND%20status%20!%3D%20%27Closed%27%20ORDER%20BY%20updatedDate%20DESC
    return this.getAndParse('https://jira.corp.docusign.com/issues/?filter=-1&jql=assignee%20%3D%20currentUser()%20AND%20status%20!%3D%20%27Closed%27%20ORDER%20BY%20updatedDate%20DESC',
      {
        topLevelSelector: '.issuerow',
        params: {
          issueLink: { selector: '.issue-link', attribute: 'href' },
          issueId: { selector: '.issue-link', attribute: 'data-issue-key' },
          status: 'td.status span',
          assignee: 'td.assignee a',
          resolution: 'td.resolution em',
          summary: 'td.summary a'
        }
      });
  }

  getAndParse(url: string, settings: IParseSettings): PromiseLike<any> {
    return new Promise<any>((res, rej) => {
      const cookies = <ICookie[]>[];

      cookies.push({
        'name': 'JSESSIONID',
        'value': 'CC2AB09598143EE5621B7BA32DEF1AB9',
        'domain': 'jira.corp.docusign.com',
        path: '/'
      });

      new PhantomService().openFrom(url, cookies)
        .then(rsp => {
          const $ = new CheerioService().loadDom(rsp);
          const results = new DomParseService($).parse(settings);

          // console.log('phantom got ', results);
          res(results);
        });
      });
  }
}
