import { Component, Output } from "rete";
import { numSocket, unitSocket } from "../sockets";
import { NumUnitControl } from "../controls/num-unit-control";
import * as ucum from "@lhncbc/ucum-lhc";

export class ConsumerComponent extends Component {

  outputUnit = "m3/h";

  constructor() {
    super("Forbruger"); // Node name
  }

  builder(node) {
    // Define the output of the node
    const out1 = new Output("num", "Forbrug", numSocket);

    return node.addControl(new NumUnitControl(this.editor, "num", false, node.data.unit)).addOutput(out1);
  }

  worker(node, inputs, outputs) {
    
    // Normalize output
    const utils = ucum.UcumLhcUtils.getInstance();
    const returnObj = utils.convertUnitTo(node.data.unit, node.data.num, this.outputUnit);
    let value;
    if(returnObj.status == "succeeded"){
      value = returnObj.toVal;
    }

    outputs["num"] = value;
    outputs["unit"] = this.outputUnit;
  }
}