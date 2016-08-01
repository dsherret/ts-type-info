import {applyMixins} from "./../../utils";
import {TypeDefinition} from "./../expression";
import {NamedDefinition} from "./NamedDefinition";
import {OptionalDefinition} from "./OptionalDefinition";
import {TypedDefinition} from "./TypedDefinition";
import {DefinitionType} from "./DefinitionType";
import {BaseDefinition} from "./BaseDefinition";

export abstract class BasePropertyDefinition extends BaseDefinition implements NamedDefinition, OptionalDefinition, TypedDefinition {
    constructor(definitionType: DefinitionType) {
        super(definitionType);
    }

    // NamedDefinition
    name: string;
    // OptionalDefinition
    isOptional: boolean;
    // TypedDefinition
    type: TypeDefinition;
    setType: (textOrDefinition: string | NamedDefinition, typeArguments?: string[]) => this;
}

applyMixins(BasePropertyDefinition, BaseDefinition, [NamedDefinition, OptionalDefinition, TypedDefinition]);
