import {WrappedSymbolNode} from "./../../wrappers";

export interface IBaseNamedDefinition {
    name: string;
}

export interface INamedDefinition extends IBaseNamedDefinition {
    fillName(symbolNode: WrappedSymbolNode): void;
}

export abstract class NamedDefinition implements INamedDefinition {
    name: string;

    fillName(symbolNode: WrappedSymbolNode) {
        this.name = symbolNode.getName();
    }
}
