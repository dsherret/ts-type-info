import {applyMixins} from "./../../utils";
import {BasePropertyDefinition} from "./../base/BasePropertyDefinition";
import {NodedDefinition} from "./../base/NodedDefinition";

export class TypePropertyDefinition extends BasePropertyDefinition implements NodedDefinition {
}

applyMixins(TypePropertyDefinition, BasePropertyDefinition, [NodedDefinition]);
