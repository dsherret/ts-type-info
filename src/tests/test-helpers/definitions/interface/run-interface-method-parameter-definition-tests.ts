import {InterfaceMethodParameterTestStructure} from "./../../test-structures";
import {InterfaceMethodParameterDefinition} from "./../../../../definitions";
import {runBaseParameterDefinitionTests} from "./../base";

export function runInterfaceMethodParameterDefinitionTests(definition: InterfaceMethodParameterDefinition, structure: InterfaceMethodParameterTestStructure) {
    describe(`parameter ${structure.name}`, () => {
        runBaseParameterDefinitionTests(definition, structure);
    });
}
