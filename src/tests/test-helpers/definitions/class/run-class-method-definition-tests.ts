import {ClassMethodStructure} from "./../../structures";
import {ClassMethodDefinition} from "./../../../../definitions";
import {runBaseClassMethodDefinitionTests} from "./base";
import {runAbstractableDefinitionTests} from "./../base";
import {runClassMethodParameterDefinitionTests} from "./run-class-method-parameter-definition-tests";

export function runClassMethodDefinitionTests(definition: ClassMethodDefinition, structure: ClassMethodStructure) {
    describe(`method ${structure.name}`, () => {
        runAbstractableDefinitionTests(definition, structure);
        runBaseClassMethodDefinitionTests(runClassMethodParameterDefinitionTests, definition, structure);
    });
}
