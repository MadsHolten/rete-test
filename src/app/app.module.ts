import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ReteEditorModule } from 'src/app/modules/rete-editor/rete-editor.module';
import { ReteEditorComponent } from 'src/app/modules/rete-editor/rete-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReteEditorModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ReteEditorComponent]
})
export class AppModule { }
