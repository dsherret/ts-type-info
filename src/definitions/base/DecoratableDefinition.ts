import {DecoratorDefinition} from "./../general";
import {ArrayExt} from "./../../utils";

export abstract class DecoratableDefinition {
    decorators = new ArrayExt<DecoratorDefinition<this>>();
}
