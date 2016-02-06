import {ClassConstructorParameterStructure} from "./../../structures";
import {ClassConstructorParameterDefinition} from "./../../../../definitions";
import {runBaseParameterDefinitionTests} from "./../base";

export function runClassConstructorParameterDefinitionTests(definition: ClassConstructorParameterDefinition, structure: ClassConstructorParameterStructure) {
    describe(`parameter ${structure.name}`, () => {
        runBaseParameterDefinitionTests(definition, structure);
    });
}
