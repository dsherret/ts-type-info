import {INode} from "./../../wrappers";

export interface IAbstractableDefinition {
    isAbstract: boolean;
    fillAbstractable(node: INode): void;
}

export abstract class AbstractableDefinition implements IAbstractableDefinition {
    isAbstract: boolean;

    fillAbstractable(node: INode) {
        this.isAbstract = node.hasAbstractKeyword();
    }
}
