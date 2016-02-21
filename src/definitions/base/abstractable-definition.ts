import {ISymbolNode} from "./../../wrappers";
import {AbstractableStructure} from "./../../structures";

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
