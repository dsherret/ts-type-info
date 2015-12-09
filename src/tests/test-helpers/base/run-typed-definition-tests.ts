import {ITypedDefinition} from "./../../../definitions/base/typed-definition";
import {runTypeTests} from "./run-type-tests";

export function runTypedDefinitionTests(definition: ITypedDefinition, name: string) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    runTypeTests(definition.type, name);
}
