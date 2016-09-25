import {applyMixins} from "./../../utils";
import {TypeDefinition} from "./../expression";
import {NamedDefinition} from "./NamedDefinition";
import {OptionalDefinition} from "./OptionalDefinition";
import {ReadonlyableDefinition} from "./ReadonlyableDefinition";
import {TypedDefinition} from "./TypedDefinition";
import {BaseDefinition} from "./BaseDefinition";

export abstract class BasePropertyDefinition extends BaseDefinition implements NamedDefinition, OptionalDefinition, TypedDefinition, ReadonlyableDefinition {
    // NamedDefinition
    name: string;
    // OptionalDefinition
    isOptional: boolean;
    // TypedDefinition
    type: TypeDefinition;
    setType: (textOrDefinition: string | NamedDefinition, typeArguments?: string[]) => this;
    // ReadonlyableDefinition
    isReadonly: boolean;
}

applyMixins(BasePropertyDefinition, BaseDefinition, [NamedDefinition, OptionalDefinition, TypedDefinition, ReadonlyableDefinition]);
