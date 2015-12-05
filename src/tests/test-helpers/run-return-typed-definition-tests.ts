import {IReturnTypedDefinition} from "./../../definitions/base/return-typed-definition";
import {runTypeTests} from "./run-type-tests";

export function runReturnTypedDefinitionTests(definition: IReturnTypedDefinition, name: string) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    runTypeTests(definition.returnType, name);
}
