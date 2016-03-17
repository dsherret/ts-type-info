import {MainFactory} from "./../../../factories";
import {TsNode, TsSymbol} from "./../../../compiler";
import {ClassPropertyBinder} from "./../../base";
import {TsBaseClassPropertyBinder} from "./base";

export class TsClassPropertyBinder extends ClassPropertyBinder {
    private symbol: TsSymbol;

    constructor(mainFactory: MainFactory, private node: TsNode) {
        super(new TsBaseClassPropertyBinder(mainFactory, node));

        this.symbol = node.getSymbol();
    }

    getIsAccessor() {
        return this.symbol.isPropertyAccessor();
    }

    getIsReadonly() {
        return this.symbol.isPropertyReadonly();
    }

    getIsConstructorParameter() {
        return this.node.isConstructorParameter();
    }
}
