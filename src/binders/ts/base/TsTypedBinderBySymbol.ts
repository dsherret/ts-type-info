import {TsSymbol, TsType, TsTypeNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypedBinder} from "./../../base";

export class TsTypedBinderBySymbol extends TypedBinder {
    constructor(private readonly factory: TsFactory, private readonly symbol: TsSymbol) {
        super();
    }

    getType() {
        const nodes = this.symbol.getNodes();

        if (nodes.length === 1)
            return this.getTypeFromTypeAndNode(nodes[0].getType(), nodes[0].getTypeNode());
        else
            return this.getTypeFromTypeAndNode(this.symbol.getType(), null);
    }

    private getTypeFromTypeAndNode(type: TsType | null, node: TsTypeNode | null) {
        if (type == null)
            return this.factory.getTypeFromText("any");

        return this.factory.getType(type, node);
    }
}
