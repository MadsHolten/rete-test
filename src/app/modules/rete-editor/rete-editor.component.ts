import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";

import { NodeEditor, Engine } from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import { AngularRenderPlugin } from "rete-angular-render-plugin";
import * as reteArea from "rete-area-plugin";

// Rete components
import { ConsumerComponent } from "./components/consumer-component";
import { JointComponent } from "./components/joint-component";
import { WatchComponent } from "./components/watch-component";

export class NumUnit{
  num: number;
  unit: string;

  constructor(value, unit?){
    this.num = value;
    this.unit = unit ? unit : null;
  }
}

@Component({
  selector: "app-rete",
  templateUrl: "./rete-editor.component.html",
  styleUrls: [ "./rete-editor.component.css" ]
})
export class ReteEditorComponent implements AfterViewInit {
  @ViewChild("nodeEditor") el: ElementRef;
  editor = null;

  async ngAfterViewInit() {
    const container = this.el.nativeElement;

    // These are the components that will be available to the user
    const components = [
      new ConsumerComponent(), 
      new JointComponent(),
      new WatchComponent()
    ];

    const editor = new NodeEditor("demo@0.2.0", container);
    editor.use(ConnectionPlugin);
    console.log("AngularRenderPlugin", AngularRenderPlugin);
    editor.use(AngularRenderPlugin); //, { component: MyNodeComponent });
    editor.use(ContextMenuPlugin);

    const engine = new Engine("demo@0.2.0");

    components.map(c => {
      editor.register(c);
      engine.register(c);
    });

    // Create initial components
    const n1 = await components[0].createNode(new NumUnit(250, "m3/h"));
    const n2 = await components[0].createNode(new NumUnit(550, "m3/h"));
    const add = await components[1].createNode();
    const res = await components[2].createNode();

    n1.position = [0, 200];
    n2.position = [0, 400];
    add.position = [400, 300];
    res.position = [800, 300];

    // Add nodes to editor
    editor.addNode(n1);
    editor.addNode(n2);
    editor.addNode(add);
    editor.addNode(res);

    // Add connections to editor
    editor.connect(n1.outputs.get("num"), add.inputs.get("num"));
    editor.connect(n2.outputs.get("num"), add.inputs.get("num"));
    editor.connect(add.outputs.get("num"), res.inputs.get("num"));

    editor.on(
      [
        "process",
        "nodecreated",
        "noderemoved",
        "connectioncreated",
        "connectionremoved"
      ],
      (async () => {
        await engine.abort();
        await engine.process(editor.toJSON());
      }) as any
    );

    editor.view.resize();
    editor.trigger("process");
    reteArea.default.zoomAt(editor);
  }
}
