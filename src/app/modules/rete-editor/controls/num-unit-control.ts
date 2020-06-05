import { Control } from "rete";
import { AngularControl } from "rete-angular-render-plugin";
import { Type } from "@angular/core";
import { NumberNgControl, QuantityKind } from "./num.component";
import { NumUnit } from '../rete-editor.component';

export class NumUnitControl extends Control implements AngularControl {

    component: Type<NumberNgControl>;
    props: { [key: string]: unknown };

    constructor(public emitter, public key, readonly = false, unit?) {
        super(key);

        this.component = NumberNgControl;
        this.props = {
            readonly,
            change: v => this.onChange(v),
            value: 0,
            label: "Luftvolumenstrøm",
            unit,
            quantityKind: QuantityKind.VolumeFlow,
            mounted: () => {
                this.setValue(+(this.getData(key) as any) || 0);
            }
        };
    }

    onChange(val: NumUnit) {
        this.setValue(val.num);
        this.setUnit(val.unit);
        this.emitter.trigger("process");
    }

    setValue(val: number) {
        this.props.value = +val;
        this.putData("num", this.props.value);
    }

    setUnit(unit: string){
        this.props.unit = unit;
        this.putData("unit", this.props.unit);
    }
}