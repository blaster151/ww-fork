import * as fs from 'fs';
import * as path from 'path';

export class FileIterationService {
  readDirR(dir): string[] {
    return fs.statSync(dir).isDirectory()
      ? Array.prototype.concat(...fs.readdirSync(dir).map(f => this.readDirR(path.join(dir, f))))
      : dir;
  }
}
