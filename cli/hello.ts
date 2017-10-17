import { CommandLineService } from './services/CommandLineService';
import { AxiosService } from '../src/app/axios.service';
import { CheerioService } from '../src/app/cheerio.service';
import { PhantomService } from './services/phantom.service';
// import { Promise } from '../node_modules/es6-promise';
import { BrainscapeService } from './services/brainscape.service';
import { JiraService } from './services/jira.service';
// import '../node_modules/zone.js';

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

brainscapeService.getSubjects().then(rsp => {
    console.log('resp 1', rsp[0]);
    brainscapeService.getDecksForSubject(rsp[0].link).then(rsp2 => {
        console.log('resp 2', rsp2[0]);
        brainscapeService.getDeck(rsp2[0].id).then(rsp3 => {
            console.log('resp 3', rsp3[0]);
            console.log('resp 3', rsp3[1]);
        });
    });
});

