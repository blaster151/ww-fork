import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppComponent } from './app.component';
import { XmlToJsonService } from './xml-to-json.service';
import { environment } from '../environments/environment';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { ArrayExtensionsService } from './array-extensions.service';
import { AudioPlayerService } from './audio-player.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BootstrapModalModule
  ],
  providers: [
    XmlToJsonService, ArrayExtensionsService, AudioPlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(arrayExtensionsService: ArrayExtensionsService) {
  }
}
