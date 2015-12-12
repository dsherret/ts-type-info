import {IReturnTypedDefinition} from "./../../../../definitions";
import {runTypeTests} from "./../../base";

export function runReturnTypedDefinitionTests(definition: IReturnTypedDefinition, name: string) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    runTypeTests(definition.returnType, name);
}
