import {DefinitionUtils} from "./../../utils";
import {TypeNodeDefinition} from "./../expression";
import {NamedDefinition} from "./NamedDefinition";

export abstract class TypedDefinition {
    type: TypeNodeDefinition;

    setType(definition: NamedDefinition, typeArguments?: string[]): this;
    setType(text: string): this;
    setType(textOrDefinition: string | NamedDefinition, typeArguments: string[] = []) {
        this.type = DefinitionUtils.getTypeNodeDefinitionFromTextOrDefinition(textOrDefinition, typeArguments);
        return this;
    }
}
