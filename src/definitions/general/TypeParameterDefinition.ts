import * as typeConstants from "./../../typeConstants";
import {applyMixins} from "./../../utils";
import {NamedDefinition, NodedDefinition, BaseDefinition} from "./../base";
import {TypeDefinition} from "./../expression";

export class TypeParameterDefinition extends BaseDefinition implements NamedDefinition, NodedDefinition {
    constraintType: TypeDefinition | null;

    // NamedDefinition
    name: string;
    // NodedDefinition
    tsNode?: typeConstants.TypeScriptNode;
}

applyMixins(TypeParameterDefinition, BaseDefinition, [NamedDefinition, NodedDefinition]);
