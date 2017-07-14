import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { XmlToJsonService } from './xml-to-json.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    XmlToJsonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
