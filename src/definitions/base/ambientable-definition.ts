import {WrappedSymbolNode} from "./../../wrappers";
import {AmbientableStructure} from "./../../structures";

export interface IAmbientableDefinition {
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable(symbolNodeOrStructure: WrappedSymbolNode | AmbientableStructure): void;
}

export abstract class AmbientableDefinition implements IAmbientableDefinition {
    isAmbient: boolean;
    hasDeclareKeyword: boolean;

    fillAmbientable(symbolNodeOrStructure: WrappedSymbolNode | AmbientableStructure) {
        if (symbolNodeOrStructure instanceof WrappedSymbolNode) {
            this.hasDeclareKeyword = symbolNodeOrStructure.hasDeclareKeyword();
            this.isAmbient = symbolNodeOrStructure.isAmbient();
        }
        else {
            this.hasDeclareKeyword = symbolNodeOrStructure.hasDeclareKeyword;
            this.isAmbient = symbolNodeOrStructure.isAmbient;
        }
    }
}
