import {DefinitionUtils} from "./../../utils";
import {TypeNodeDefinition} from "./../expression";
import {NamedDefinition} from "./NamedDefinition";

export abstract class ThisTypedDefinition {
    thisType: TypeNodeDefinition | null = null;

    setThisType(definition: NamedDefinition, typeArguments?: string[]): this;
    setThisType(text: string): this;
    setThisType(textOrDefinition: string | NamedDefinition, typeArguments: string[] = []) {
        this.thisType = DefinitionUtils.getTypeNodeDefinitionFromTextOrDefinition(textOrDefinition, typeArguments);
        return this;
    }
}
