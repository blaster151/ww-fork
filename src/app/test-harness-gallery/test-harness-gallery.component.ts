import { Component, OnInit } from '@angular/core';
import { UrlLoaderService } from '../url-loader.service';

@Component({
  selector: 'app-test-harness-gallery',
  templateUrl: './test-harness-gallery.component.html',
  styleUrls: ['./test-harness-gallery.component.css']
})
export class TestHarnessGalleryComponent implements OnInit {

  constructor(private urlLoaderService: UrlLoaderService) { }

  ngOnInit() {
    console.log('got to ngoninit');

    this.urlLoaderService.parseFromUrl('http://slashdot.org', 'div', {}).then(
      r => console.log('got into rsp')
    );
  }

}
