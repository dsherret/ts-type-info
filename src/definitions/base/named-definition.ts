import {ISymbolNode} from "./../../wrappers";

export interface IBaseNamedDefinition {
    name: string;
}

export interface INamedDefinition extends IBaseNamedDefinition {
    fillName(symbolNode: ISymbolNode): void;
}

export abstract class NamedDefinition implements INamedDefinition {
    name: string;

    fillName(symbolNode: ISymbolNode) {
        this.name = symbolNode.getName();
    }
}
