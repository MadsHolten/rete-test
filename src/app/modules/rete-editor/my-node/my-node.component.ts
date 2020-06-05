import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NodeEditor, Node, Input as ReteInput, Output as ReteOutput, Control as ReteControl } from 'rete';
import { NodeComponent, NodeService } from 'rete-angular-render-plugin';

import { faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './my-node.component.html', // copy template from src/node
  styleUrls: ['./my-node.component.css'], // copy styles from src/node
  providers: [NodeService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyNodeComponent extends NodeComponent {

  public editTitleMode = false;
  faSave = faSave;

  constructor(protected service: NodeService, protected cdr: ChangeDetectorRef) {
    super(service, cdr);
  }

  toggleEditTitleMode(){
      this.editTitleMode = !this.editTitleMode;
  }
}