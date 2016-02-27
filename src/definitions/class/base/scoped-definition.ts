import {Scope} from "./../scope";
import {INode} from "./../../../wrappers";

export interface IScopedDefinition {
    scope: Scope;
    fillScope(node: INode): void;
}

export abstract class ScopedDefinition implements IScopedDefinition {
    scope: Scope;

    fillScope(node: INode) {
        this.scope = node.getScope();
    }
}
