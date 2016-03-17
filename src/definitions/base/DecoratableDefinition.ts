import {DecoratorDefinition} from "./../general";
import {TsNode} from "./../../wrappers";
import {ArrayExt} from "./../../utils";

export abstract class DecoratableDefinition {
    decorators = new ArrayExt<DecoratorDefinition<this>>();
}
