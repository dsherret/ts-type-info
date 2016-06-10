import {applyMixins} from "./../../utils";
import {TypeDefinition} from "./../expression";
import {NamedDefinition} from "./NamedDefinition";
import {TypedDefinition} from "./TypedDefinition";
import {DefinitionType} from "./DefinitionType";
import {BaseDefinition} from "./BaseDefinition";

export abstract class BasePropertyDefinition extends BaseDefinition implements NamedDefinition, TypedDefinition {
    isOptional: boolean;

    constructor(definitionType: DefinitionType) {
        super(definitionType);
    }

    // NamedDefinition
    name: string;
    // TypedDefinition
    type: TypeDefinition;
    setType: (text: string) => any;
}

applyMixins(BasePropertyDefinition, BaseDefinition, [NamedDefinition, TypedDefinition]);
