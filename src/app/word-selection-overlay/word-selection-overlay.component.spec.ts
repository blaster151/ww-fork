import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSelectionOverlayComponent } from './word-selection-overlay.component';

describe('WordSelectionOverlayComponent', () => {
  let component: WordSelectionOverlayComponent;
  let fixture: ComponentFixture<WordSelectionOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordSelectionOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordSelectionOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
