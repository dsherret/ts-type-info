import * as typeConstants from "./../../typeConstants";
import {BaseDefinition} from "./BaseDefinition";

export abstract class NodedDefinition extends BaseDefinition {
    tsNode?: typeConstants.TypeScriptNode;
}
