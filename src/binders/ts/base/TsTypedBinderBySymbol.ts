import {TsSymbol} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypedBinder} from "./../../base";

export class TsTypedBinderBySymbol extends TypedBinder {
    constructor(private readonly factory: TsFactory, private readonly symbol: TsSymbol) {
        super();
    }

    getType() {
        const nodes = this.symbol.getNodes();

        if (nodes.length === 1)
            return this.factory.getType(nodes[0].getType(), nodes[0].getTypeNode());
        else
            return this.factory.getType(this.symbol.getType(), null);
    }
}
