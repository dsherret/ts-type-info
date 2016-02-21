import {ISymbolNode} from "./../../wrappers";

export interface IAbstractableDefinition {
    isAbstract: boolean;
    fillAbstractable(symbolNode: ISymbolNode): void;
}

export abstract class AbstractableDefinition implements IAbstractableDefinition {
    isAbstract: boolean;

    fillAbstractable(symbolNode: ISymbolNode) {
        this.isAbstract = symbolNode.hasAbstractKeyword();
    }
}
