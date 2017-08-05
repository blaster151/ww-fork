import { Component, OnInit } from '@angular/core';
import { AxiosService } from '../axios.service';
import { CheerioService } from '../cheerio.service';
import { UrlLoaderService } from '../url-loader.service';

@Component({
  selector: 'app-test-harness',
  templateUrl: './test-harness.component.html',
  styleUrls: ['./test-harness.component.css']
})
export class TestHarnessComponent implements OnInit {
  constructor(private ax: AxiosService, private ch: CheerioService, private u: UrlLoaderService) { }

  ngOnInit() {
    const names = [{ firstName: 'Jeff' }, { firstName: 'Adam'}];
    names.orderBy(p => p.firstName).forEach(n => console.log(n));

    this.u.parseFromUrl('http://www.cnn.com', 'a',
    {
      link: (frag) => frag.attribs.href,
      description: (frag) => frag.children[0].data
    })
    .then(rsp => console.log(rsp));
  }
}
