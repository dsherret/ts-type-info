import {ITypedDefinition} from "./../../../definitions";
import {runTypeTests} from "./run-type-tests";

export function runTypedDefinitionTests(definition: ITypedDefinition, name: string) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    runTypeTests(definition.type, name);
}
