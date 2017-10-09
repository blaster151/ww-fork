import { CommandLineService } from './services/CommandLineService';
import { AxiosService } from '../src/app/axios.service';
import { CheerioService } from '../src/app/cheerio.service';
import { PhantomService } from './services/phantom.service';
import { Promise } from '../node_modules/es6-promise';
import { BrainscapeService } from './services/brainscape.service';
import { JiraService } from './services/jira.service';

//console.log('Hello, world');

const jiraService = new JiraService();
    jiraService.getOpenIssues().then(rsp => {
        console.log(rsp);

        let issueId = rsp[0].issueId;
        jiraService.getIssue(issueId).then(rsp2 => {
            //console.log(rsp2);
        });
    });

const brainscapeService = new BrainscapeService();

// brainscapeService.getSubjects().then(rsp => {
//     brainscapeService.getDecksForSubject(rsp[0].link).then(rsp2 => {
//         brainscapeService.getDeck(rsp2[0].id).then(rsp3 => {
//             console.log('resp 3', rsp3[0]);
//         });
//     });
// });

