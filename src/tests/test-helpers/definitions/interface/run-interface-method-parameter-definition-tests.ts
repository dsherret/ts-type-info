import {InterfaceMethodParameterStructure} from "./../../structures";
import {InterfaceMethodParameterDefinition} from "./../../../../definitions";
import {runBaseParameterDefinitionTests} from "./../base";

export function runInterfaceMethodParameterDefinitionTests(definition: InterfaceMethodParameterDefinition, structure: InterfaceMethodParameterStructure) {
    describe(`parameter ${structure.name}`, () => {
        runBaseParameterDefinitionTests(definition, structure);
    });
}
