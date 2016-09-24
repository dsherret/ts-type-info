import {DefinitionUtils} from "./../../utils";
import {TypeDefinition} from "./../expression";
import {NamedDefinition} from "./NamedDefinition";

export abstract class TypedDefinition {
    type: TypeDefinition;

    setType(definition: NamedDefinition, typeArguments?: string[]): this;
    setType(text: string): this;
    setType(textOrDefinition: string | NamedDefinition, typeArguments: string[] = []) {
        this.type = DefinitionUtils.getTypeDefinitionFromTextOrDefinition(textOrDefinition, typeArguments);
        return this;
    }
}
