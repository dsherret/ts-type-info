import {TypedTestStructure} from "./../../testStructures";
import {TypedDefinition} from "./../../../../definitions";
import {runTypeNodeDefinitionTests} from "./../expression";

export function runTypedDefinitionTests(definition: TypedDefinition, structure: TypedTestStructure) {
    runTypeNodeDefinitionTests(definition.type, structure.type || { text: "any" });
}
