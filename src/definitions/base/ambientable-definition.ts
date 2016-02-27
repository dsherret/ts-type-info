import {INode} from "./../../wrappers";

export interface IAmbientableDefinition {
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable(node: INode): void;
}

export abstract class AmbientableDefinition implements IAmbientableDefinition {
    isAmbient: boolean;
    hasDeclareKeyword: boolean;

    fillAmbientable(node: INode) {
        this.hasDeclareKeyword = node.hasDeclareKeyword();
        this.isAmbient = node.isAmbient();
    }
}
