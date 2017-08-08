import * as cp from 'child_process';
import * as path from 'path';
import { Promise } from '../../node_modules/es6-promise';

export class CommandLineService {
    runCommand(cmd: string) {
        return new Promise<IChildProcessResult>((res, rej) => {
            const stdout: string[] = [];

            const child = cp.exec(cmd);
            child.stdout.on('data', (data) => {
                stdout.push(data.toString());
            });
            child.on('exit', function (code: string, signal: string) {
                res(<IChildProcessResult>{
                    stdout: stdout,
                    code: code,
                    signal: signal
                });
            });
        });
    }
}

export interface IChildProcessResult
{
    stdout: string[],
    code: string,
    signal: string
}