import {WrappedSymbolNode} from "./../../wrappers";
import {NamedStructure} from "./../../structures";

export interface IBaseNamedDefinition {
    name: string;
}

export interface INamedDefinition extends IBaseNamedDefinition {
    fillName(symbolNodeOrStructure: WrappedSymbolNode | NamedStructure): void;
}

export abstract class NamedDefinition implements INamedDefinition {
    name: string;

    fillName(symbolNodeOrStructure: WrappedSymbolNode | NamedStructure) {
        if (symbolNodeOrStructure instanceof WrappedSymbolNode) {
            this.name = symbolNodeOrStructure.getName();
        }
        else {
            this.name = symbolNodeOrStructure.name;
        }
    }
}
