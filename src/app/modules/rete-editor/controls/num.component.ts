import { Component, Input } from "@angular/core";
import * as ucum from "@lhncbc/ucum-lhc";

export enum QuantityKind{
  VolumeFlow = "volumeFlow"
}

@Component({
  templateUrl: "./num.component.html",
  styleUrls: [ "./num.component.css" ]
})
export class NumberNgControl {
  @Input() value: number;
  @Input() label: string = "Label";
  @Input() unit: string;
  @Input() quantityKind: QuantityKind;
  @Input() readonly: boolean;
  @Input() change: Function;
  @Input() mounted: Function;

  unitOptions;

  // To allow conversion between units
  previousUnit: string;

  ngOnInit() {
    this.mounted();

    if(this.unit){
      this.previousUnit = this.unit;
    }

    if(this.quantityKind && this.quantityKind == QuantityKind.VolumeFlow){
      this.unitOptions = [
        {value: "m3/h", displayName: "m&sup3;/h"},
        {value: "m3/min", displayName: "m&sup3;/min"},
        {value: "l/s", displayName: "l/s"},
        {value: "l/min", displayName: "l/min"}
      ];
    }
  }

  onUnitChange(){
    const utils = ucum.UcumLhcUtils.getInstance();

    // Convert to new unit
    const returnObj = utils.convertUnitTo(this.previousUnit, this.value, this.unit);
    
    if(returnObj.status == "succeeded"){
      this.value = returnObj.toVal;
    }

    this.onValueChange();
    
    // Set the new unit as previous unit
    this.previousUnit = this.unit;
  }

  onValueChange(){
    this.change({num: this.value, unit: this.unit});
  }
}