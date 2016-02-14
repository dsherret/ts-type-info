import {WrappedSymbolNode} from "./../../wrappers";

export interface IAmbientableDefinition {
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable(symbolNode: WrappedSymbolNode): void;
}

export abstract class AmbientableDefinition implements IAmbientableDefinition {
    isAmbient: boolean;
    hasDeclareKeyword: boolean;

    fillAmbientable(symbolNode: WrappedSymbolNode) {
        this.hasDeclareKeyword = symbolNode.hasDeclareKeyword();
        this.isAmbient = symbolNode.isAmbient();
    }
}
