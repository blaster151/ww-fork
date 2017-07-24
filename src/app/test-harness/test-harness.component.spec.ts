import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestHarnessComponent } from './test-harness.component';

describe('TestHarnessComponent', () => {
  let component: TestHarnessComponent;
  let fixture: ComponentFixture<TestHarnessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHarnessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHarnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
