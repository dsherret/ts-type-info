import {InterfaceMethodStructure} from "./../../structures";
import {InterfaceMethodDefinition} from "./../../../../definitions";
import {runBaseFunctionDefinitionTests} from "./../function";
import {runInterfaceMethodParameterDefinitionTests} from "./run-interface-method-parameter-definition-tests";

export function runInterfaceMethodDefinitionTests(definition: InterfaceMethodDefinition, structure: InterfaceMethodStructure) {
    describe(`method ${structure.name}`, () => {
        runBaseFunctionDefinitionTests(runInterfaceMethodParameterDefinitionTests, definition, structure);
    });
}
