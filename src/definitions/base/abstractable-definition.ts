import {WrappedSymbolNode} from "./../../wrappers";
import {AbstractableStructure} from "./../../structures";

export interface IAbstractableDefinition {
    isAbstract: boolean;
    fillAbstractable(symbolNodeOrStructure: WrappedSymbolNode | AbstractableStructure): void;
}

export abstract class AbstractableDefinition implements IAbstractableDefinition {
    isAbstract: boolean;

    fillAbstractable(symbolNodeOrStructure: WrappedSymbolNode | AbstractableStructure) {
        if (symbolNodeOrStructure instanceof WrappedSymbolNode) {
            this.isAbstract = symbolNodeOrStructure.hasAbstractKeyword();
        }
        else {
            this.isAbstract = symbolNodeOrStructure.isAbstract;
        }
    }
}
