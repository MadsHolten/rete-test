import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { ReteModule } from "rete-angular-render-plugin";
import { NumberNgControl } from "./controls/num.component";
import { ReteEditorComponent } from "./rete-editor.component";

import { MyNodeComponent } from './my-node/my-node.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    ReteEditorComponent, 
    NumberNgControl,
    MyNodeComponent
  ],
  imports: [
    CommonModule, 
    FormsModule,
    ReteModule,
    FontAwesomeModule
  ],
  exports: [
    ReteEditorComponent
  ],
  entryComponents: [NumberNgControl, MyNodeComponent]
})
export class ReteEditorModule {}