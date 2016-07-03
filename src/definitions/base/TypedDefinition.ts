import {DefinitionUtils} from "./../../utils";
import {TypeDefinition} from "./../expression";
import {NamedDefinition} from "./NamedDefinition";

export abstract class TypedDefinition {
    type: TypeDefinition;

    setType(definition: NamedDefinition, typeArguments?: string[]): TypeDefinition;
    setType(text: string): TypeDefinition;
    setType(textOrDefinition: string | NamedDefinition, typeArguments: string[] = []) {
        const def = DefinitionUtils.getTypeDefinitionFromTextOrDefinition(textOrDefinition, typeArguments);
        if (def != null) {
            this.type = def;
        }
        return this as any;
    }
}
