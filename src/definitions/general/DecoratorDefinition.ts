import {Expression} from "./../../expressions";
import {TsNode} from "./../../wrappers";
import {ArrayExt} from "./../../utils";
import {NamedDefinition, ParentedDefinition, BaseDefinition, DefinitionType} from "./../base";

export class DecoratorDefinition<ParentType> extends BaseDefinition implements NamedDefinition, ParentedDefinition<ParentType> {
    arguments = new ArrayExt<Expression>();

    constructor() {
        super(DefinitionType.Decorator);
    }

    // NamedDefinition
    name: string;
    // IParentedDefinition
    parent: ParentType;
}
