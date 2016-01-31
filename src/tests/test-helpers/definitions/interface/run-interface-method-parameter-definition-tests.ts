import {InterfaceMethodParameterStructure} from "./../../structures";
import {InterfaceMethodParameterDefinition} from "./../../../../definitions";
import {runBaseParameterDefinitionTests} from "./../function";

export function runInterfaceMethodParameterDefinitionTests(definition: InterfaceMethodParameterDefinition, structure: InterfaceMethodParameterDefinition) {
    describe(`parameter ${structure.name}`, () => {
        runBaseParameterDefinitionTests(definition, structure);
    });
}
