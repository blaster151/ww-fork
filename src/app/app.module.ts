import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';

import { AppComponent } from './app.component';
import { TestHarnessComponent } from './test-harness/test-harness.component';
import { WordComponent } from './word/word.component';
import { WordListComponent } from './word-list/word-list.component';
import { WordGridComponent } from './word-grid/word-grid.component';

import { XmlToJsonService } from './xml-to-json.service';
import { GameContentService } from './game-content.service';
import { CellDirective } from './cell.directive';
import { WordSelectionStateService } from './word-selection-state.service';
import { GameplayComponent } from './gameplay/gameplay.component';
import { WordSelectionOverlayComponent } from './word-selection-overlay/word-selection-overlay.component';
import { TimerService } from './timer.service';
import { TimerComponent } from './timer/timer.component';
import { LocalStorageService } from './local-storage.service';
// import { Observable } from 'RxJs';
import { EndOfGameCelebrationService } from './end-of-game-celebration.service';
import { Overlay, OverlayRenderer, ModalModule } from 'ngx-modialog';
import { LogoComponent } from './logo/logo.component';
import { GameLaunchComponent } from './game-launch/game-launch.component';
import { BandDrawerService } from './band-drawer.service';
import * as extensions from './extensions';
import { TestHarnessGalleryComponent } from './test-harness-gallery/test-harness-gallery.component';
import { BiggestPossibleSquareDirective } from './biggest-possible-square.directive';
import { DynamicFontSizeDirective } from './dynamic-font-size.directive';
import { EndOfGameComponent } from './end-of-game/end-of-game.component';

let contentPath = '/app/xml_samples';
  if (window && window.frameElement)
  {
    let path = window.frameElement.getAttribute('data-content-path');
    contentPath = path;
  }

@NgModule({
  declarations: [
    AppComponent,
    TestHarnessComponent,
    WordComponent,
    WordListComponent,
    WordGridComponent,
    CellDirective,
    GameplayComponent,
    WordSelectionOverlayComponent,
    TimerComponent,
    LogoComponent,
    GameLaunchComponent,
    TestHarnessGalleryComponent,
    BiggestPossibleSquareDirective,
    DynamicFontSizeDirective,
    EndOfGameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [ XmlToJsonService, GameContentService, WordSelectionStateService, TimerService, LocalStorageService, EndOfGameCelebrationService, Overlay, { provide: 'path', useValue: contentPath }, BandDrawerService ],
  bootstrap: [GameLaunchComponent]
})
export class AppModule {
  constructor(private http: Http) {
    extensions.configureExtensionMethods();
  }
}
