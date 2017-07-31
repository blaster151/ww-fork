import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLaunchComponent } from './game-launch.component';

describe('GameLaunchComponent', () => {
  let component: GameLaunchComponent;
  let fixture: ComponentFixture<GameLaunchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameLaunchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
