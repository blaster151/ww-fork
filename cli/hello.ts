import { CommandLineService } from './services/CommandLineService';
console.log('Hello, world');

new CommandLineService().runCommand('dir').then(result => {
    console.log('Ran dir command; lines ', result.stdout.length);
});
