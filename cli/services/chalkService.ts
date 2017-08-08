import * as chalk from 'chalk';

export class ChalkService
{
  log(msg: string) {
    console.log(chalk.green.bold(msg));
    chalk.reset();
  }
}
