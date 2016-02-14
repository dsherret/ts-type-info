import {WrappedSymbolNode} from "./../../wrappers";

export interface IAbstractableDefinition {
    isAbstract: boolean;
    fillAbstractable(symbolNode: WrappedSymbolNode): void;
}

export abstract class AbstractableDefinition implements IAbstractableDefinition {
    isAbstract: boolean;

    fillAbstractable(symbolNode: WrappedSymbolNode) {
        this.isAbstract = symbolNode.hasAbstractKeyword();
    }
}
