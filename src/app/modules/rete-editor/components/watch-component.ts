import { Component, Input, Output } from "rete";
import { numSocket, unitSocket } from "../sockets";
import { NumUnitControl } from "../controls/num-unit-control";

export class WatchComponent extends Component {

  unit;

  constructor() {
    super("Resultat"); // Node name
  }

  async builder(node) {
    // Define the input of the node
    const inp = new Input("num", "Forbrug", numSocket);

    inp.addControl(new NumUnitControl(this.editor, "num"));

    node
      .addInput(inp)
      .addControl(new NumUnitControl(this.editor, "preview", true, "m3/h"));
  }

  worker(node, inputs, outputs) {

    const val = inputs["num"].length ? inputs["num"][0] : inputs["num"];
    
    // Update preview
    const ctrl = this.editor.nodes
      .find(n => n.id === node.id)
      .controls.get("preview") as NumUnitControl;
    ctrl.setValue(val);
  }
}