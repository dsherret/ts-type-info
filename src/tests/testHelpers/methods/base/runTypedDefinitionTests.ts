import {TypedTestStructure} from "./../../testStructures";
import {TypedDefinition} from "./../../../../definitions";
import {runTypeDefinitionTests} from "./../expression";

export function runTypedDefinitionTests(definition: TypedDefinition, structure: TypedTestStructure) {
    runTypeDefinitionTests(definition.type, structure.type || { text: "any" });
}
