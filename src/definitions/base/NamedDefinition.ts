import {INode} from "./../../wrappers";

export interface IBaseNamedDefinition {
    name: string;
}

export interface INamedDefinition extends IBaseNamedDefinition {
    fillName(node: INode): void;
}

export abstract class NamedDefinition implements INamedDefinition {
    name: string;

    fillName(node: INode) {
        this.name = node.getName();
    }
}
