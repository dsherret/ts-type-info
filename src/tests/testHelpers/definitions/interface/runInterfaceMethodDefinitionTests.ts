import {InterfaceMethodTestStructure} from "./../../testStructures";
import {InterfaceMethodDefinition} from "./../../../../definitions";
import {runBaseFunctionDefinitionTests} from "./../base";
import {runInterfaceMethodParameterDefinitionTests} from "./runInterfaceMethodParameterDefinitionTests";
import {ensureNotNull} from "./../../EnsureNotNull";

export function runInterfaceMethodDefinitionTests(definition: InterfaceMethodDefinition, structure: InterfaceMethodTestStructure) {
    describe(`method ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBaseFunctionDefinitionTests(runInterfaceMethodParameterDefinitionTests, definition, structure);
        });
    });
}
