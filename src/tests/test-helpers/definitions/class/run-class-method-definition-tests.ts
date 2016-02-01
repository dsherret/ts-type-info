import {ClassMethodStructure} from "./../../structures";
import {ClassMethodDefinition} from "./../../../../definitions";
import {runBaseClassMethodDefinitionTests} from "./base";
import {runClassMethodParameterDefinitionTests} from "./run-class-method-parameter-definition-tests";

export function runClassMethodDefinitionTests(definition: ClassMethodDefinition, structure: ClassMethodStructure) {
    describe(`method ${structure.name}`, () => {
        runBaseClassMethodDefinitionTests(runClassMethodParameterDefinitionTests, definition, structure);
    });
}
