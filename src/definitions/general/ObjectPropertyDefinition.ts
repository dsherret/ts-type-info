import {applyMixins} from "./../../utils";
import {BaseObjectPropertyDefinition, NodedDefinition} from "./../base";

export class ObjectPropertyDefinition extends BaseObjectPropertyDefinition implements NodedDefinition {
}

applyMixins(ObjectPropertyDefinition, BaseObjectPropertyDefinition, [NodedDefinition]);
