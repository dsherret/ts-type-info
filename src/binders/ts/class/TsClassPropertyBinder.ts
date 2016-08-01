import {TsFactory} from "./../../../factories";
import {TsNode, TsSymbol} from "./../../../compiler";
import {ClassPropertyBinder} from "./../../base";
import {TsBaseClassPropertyBinder} from "./base";

export class TsClassPropertyBinder extends ClassPropertyBinder {
    private readonly symbol: TsSymbol;

    constructor(factory: TsFactory, node: TsNode) {
        super(new TsBaseClassPropertyBinder(factory, node));
        this.symbol = node.getSymbol()!;
    }

    getIsAccessor() {
        return this.symbol.isPropertyAccessor();
    }

    getIsReadonly() {
        return this.symbol.isPropertyReadonly();
    }

    getOnWriteGetBody() {
        return null;
    }

    getOnWriteSetBody() {
        return null;
    }
}
