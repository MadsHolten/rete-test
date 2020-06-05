import { Component, Input, Output } from "rete";
import { numSocket, unitSocket } from "../sockets";
import { NumUnitControl } from "../controls/num-unit-control";

export class JointComponent extends Component {
  constructor() {
    super("Manifold"); // Node name
  }

  async builder(node) {
    // Define the input of the node
    const inp = new Input("num", "Ind", numSocket, true);
    const out = new Output("num", "Ud", numSocket);

    inp.addControl(new NumUnitControl(this.editor, "num"));

    node
      .addInput(inp)
      .addOutput(out);
  }

  worker(node, inputs, outputs) {

    // Sum up the inputs
    let sum = 0;
    if(inputs["num"].length){
        sum = inputs["num"].reduce((a, b) => a+b);
    }

    // Output value
    outputs["num"] = sum;
  }
}