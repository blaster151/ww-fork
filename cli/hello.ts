import { CommandLineService } from './services/CommandLineService';
import { AxiosService } from '../src/app/axios.service';
import { CheerioService } from '../src/app/cheerio.service';
import { PhantomService } from './services/phantom.service';
import { Promise } from '../node_modules/es6-promise';
import { BrainscapeService } from './services/brainscape.service';

console.log('Hello, world');

const brainscapeService = new BrainscapeService();
brainscapeService.getSubjects().then(rsp => {
    brainscapeService.getDecksForSubject(rsp[0].link).then(rsp2 => {
        brainscapeService.getDeck(rsp2[0].id).then(rsp3 => {
            console.log('resp 3', rsp3[0]);
        });
    });
});
// new BrainscapeService().getDeck();
// new CommandLineService().runCommand('dir').then(result => {
//     console.log('Ran dir command; lines ', result.stdout.length);

//     new AxiosService().getUrlContents('http://www.amazon.com')
//         .then(rsp => {
//             console.log('received ', rsp);
//             const phantomPromise = new PhantomService().openFrom('http://www.slashdot.org');
//             phantomPromise.then((resulting) => {
//                 console.log('after phantom promise');
//             });
//         });

// });

