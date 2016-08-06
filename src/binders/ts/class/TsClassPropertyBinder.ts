import {ClassPropertyKind} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {TsNode, TsSymbol} from "./../../../compiler";
import {ClassPropertyBinder} from "./../../base";
import {TsAbstractableBinder} from "./../base";
import {TsBaseClassPropertyBinder} from "./base";

export class TsClassPropertyBinder extends ClassPropertyBinder {
    private readonly symbols: TsSymbol[];

    constructor(factory: TsFactory, nodes: TsNode[]) {
        super(
            new TsBaseClassPropertyBinder(factory, nodes[0]),
            new TsAbstractableBinder(nodes[0])
        );
        this.symbols = nodes.map(node => node.getSymbol()!);
    }

    getKind() {
        let kind = ClassPropertyKind.Normal;

        if (this.symbols.some(s => s.hasGetAccessor())) {
            kind = kind | ClassPropertyKind.GetAccessor;
        }

        if (this.symbols.some(s => s.hasSetAccessor())) {
            kind = kind | ClassPropertyKind.SetAccessor;
        }

        return kind;
    }

    getOnWriteGetBody() {
        return null;
    }

    getOnWriteSetBody() {
        return null;
    }
}
