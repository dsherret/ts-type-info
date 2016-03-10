import {InterfaceMethodParameterTestStructure} from "./../../testStructures";
import {InterfaceMethodParameterDefinition} from "./../../../../definitions";
import {ensureNotNull} from "./../../EnsureNotNull";
import {runBaseParameterDefinitionTests} from "./../base";

export function runInterfaceMethodParameterDefinitionTests(definition: InterfaceMethodParameterDefinition, structure: InterfaceMethodParameterTestStructure) {
    describe(`parameter ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBaseParameterDefinitionTests(definition, structure);
        });
    });
}
