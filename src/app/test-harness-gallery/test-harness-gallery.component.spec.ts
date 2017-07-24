import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestHarnessGalleryComponent } from './test-harness-gallery.component';

describe('TestHarnessGalleryComponent', () => {
  let component: TestHarnessGalleryComponent;
  let fixture: ComponentFixture<TestHarnessGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHarnessGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHarnessGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
