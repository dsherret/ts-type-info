import {DefinitionUtils} from "./../../utils";
import {TypeDefinition} from "./../expression";
import {NamedDefinition} from "./NamedDefinition";

export abstract class ThisTypedDefinition {
    thisType: TypeDefinition | null = null;

    setThisType(definition: NamedDefinition, typeArguments?: string[]): this;
    setThisType(text: string): this;
    setThisType(textOrDefinition: string | NamedDefinition, typeArguments: string[] = []) {
        this.thisType = DefinitionUtils.getTypeDefinitionFromTextOrDefinition(textOrDefinition, typeArguments);
        return this;
    }
}
