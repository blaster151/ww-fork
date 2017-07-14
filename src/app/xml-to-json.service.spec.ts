import { TestBed, inject } from '@angular/core/testing';

import { XmlToJsonService } from './xml-to-json.service';

describe('XmlToJsonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XmlToJsonService]
    });
  });

  it('should be created', inject([XmlToJsonService], (service: XmlToJsonService) => {
    expect(service).toBeTruthy();
  }));
});
