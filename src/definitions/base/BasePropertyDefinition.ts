import {applyMixins} from "./../../utils";
import {TypeNodeDefinition} from "./../expression";
import {NamedDefinition} from "./NamedDefinition";
import {OptionalDefinition} from "./OptionalDefinition";
import {ReadonlyableDefinition} from "./ReadonlyableDefinition";
import {TypedDefinition} from "./TypedDefinition";
import {DefinitionType} from "./DefinitionType";
import {BaseDefinition} from "./BaseDefinition";

export abstract class BasePropertyDefinition extends BaseDefinition implements NamedDefinition, OptionalDefinition, TypedDefinition, ReadonlyableDefinition {
    constructor(definitionType: DefinitionType) {
        super(definitionType);
    }

    // NamedDefinition
    name: string;
    // OptionalDefinition
    isOptional: boolean;
    // TypedDefinition
    type: TypeNodeDefinition;
    setType: (textOrDefinition: string | NamedDefinition, typeArguments?: string[]) => this;
    // ReadonlyableDefinition
    isReadonly: boolean;
}

applyMixins(BasePropertyDefinition, BaseDefinition, [NamedDefinition, OptionalDefinition, TypedDefinition, ReadonlyableDefinition]);
