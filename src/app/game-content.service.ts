import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { XmlToJsonService } from './xml-to-json.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Puzzle } from './models/puzzle';
import { Word } from 'app/models/word';
import { PuzzleRow } from './models/puzzleRow';
import { ContentPathService } from './content-path.service';

@Injectable()
export class GameContentService {
  public path: string;

  constructor(private xmlService: XmlToJsonService, private http: Http, contentPathService: ContentPathService) {
    this.xmlService = xmlService;
    this.http = http;
    this.path = contentPathService.getContentPath();
  }

  loadGame(id: string): Promise<Puzzle> {
    return this.http.get(`${this.path}/wwf${id}-data.xml`)
      .map(rsp => {
        let result = rsp.text().replace(/(\r\n|\n|\r)/gm,"");

        return result;
      })
      .map(rsp => this.xmlService.xmlStringToJson(rsp))
      .map(j => {
        let result = new Puzzle();

        result.title = j.wonderword.Title['@attributes'].v;
        result.words = j.wonderword.Clues['@attributes'].v.split(',').map(w => new Word(w.toUpperCase()));
        result.solution = j.wonderword.Solution['@attributes'].v;
        result.rows = j.wonderword.Grid['@attributes'].v.split(',').map(row => new PuzzleRow(row.split('')));

        return result;
      })
      .toPromise<Puzzle>();
  }
}
