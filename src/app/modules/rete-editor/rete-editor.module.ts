import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { ReteModule } from "rete-angular-render-plugin";
import { NumberNgControl } from "./controls/num.component";
import { ReteEditorComponent } from "./rete-editor.component";

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    ReteEditorComponent, 
    NumberNgControl
  ],
  imports: [
    CommonModule, 
    FormsModule,
    ReteModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    ReteEditorComponent
  ],
  entryComponents: [NumberNgControl]
})
export class ReteEditorModule {}