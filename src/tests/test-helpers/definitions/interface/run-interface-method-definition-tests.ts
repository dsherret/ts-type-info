import {InterfaceMethodTestStructure} from "./../../test-structures";
import {InterfaceMethodDefinition} from "./../../../../definitions";
import {runBaseFunctionDefinitionTests} from "./../base";
import {runInterfaceMethodParameterDefinitionTests} from "./run-interface-method-parameter-definition-tests";
import {ensureNotNull} from "./../../ensure-not-null";

export function runInterfaceMethodDefinitionTests(definition: InterfaceMethodDefinition, structure: InterfaceMethodTestStructure) {
    describe(`method ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBaseFunctionDefinitionTests(runInterfaceMethodParameterDefinitionTests, definition, structure);
        });
    });
}
