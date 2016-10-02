import * as typeConstants from "./../../../typeConstants";
import {NodedDefinition} from "./../../../definitions";

export abstract class NodedBinder {
    abstract getTsNode(): typeConstants.TypeScriptNode | undefined;

    bind(def: NodedDefinition) {
        def.tsNode = this.getTsNode();
    }
}
