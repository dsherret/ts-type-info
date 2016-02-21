import {ISymbolNode} from "./../../wrappers";

export interface IAmbientableDefinition {
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable(symbolNode: ISymbolNode): void;
}

export abstract class AmbientableDefinition implements IAmbientableDefinition {
    isAmbient: boolean;
    hasDeclareKeyword: boolean;

    fillAmbientable(symbolNode: ISymbolNode) {
        this.hasDeclareKeyword = symbolNode.hasDeclareKeyword();
        this.isAmbient = symbolNode.isAmbient();
    }
}
