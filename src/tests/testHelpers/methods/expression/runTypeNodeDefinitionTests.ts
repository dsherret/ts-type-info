import {TypeNodeDefinition} from "./../../../../definitions";
import {TypeNodeTestStructure} from "./../../testStructures";
import {ensureNotNull} from "./../../ensureNotNull";
import {runTypeParameteredDefinitionTests, runParameteredDefinitionTests} from "./../base";
import {runTypeFunctionParameterDefinitionTests} from "./runTypeFunctionParameterDefinitionTests";
import {runTypeDefinitionTests} from "./runTypeDefinitionTests";
import {runBaseTypeDefinitionTests} from "./base";

export function runTypeNodeDefinitionTests(definition: TypeNodeDefinition | null, structure: TypeNodeTestStructure) {
    describe("type node", () => {
        ensureNotNull(definition, () => {
            runBaseTypeDefinitionTests(definition!, structure, runTypeDefinitionTests);
            runTypeParameteredDefinitionTests(definition!, structure);
            runParameteredDefinitionTests(runTypeFunctionParameterDefinitionTests, definition!, structure);
        });
    });
}
