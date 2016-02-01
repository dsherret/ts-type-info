import {ConstructorParameterStructure} from "./../../structures";
import {ConstructorParameterDefinition} from "./../../../../definitions";
import {runBaseParameterDefinitionTests} from "./../function";

export function runConstructorParameterDefinitionTests(definition: ConstructorParameterDefinition, structure: ConstructorParameterStructure) {
    describe(`parameter ${structure.name}`, () => {
        runBaseParameterDefinitionTests(definition, structure);
    });
}
