import {ClassMethodStructure} from "./../../structures";
import {ClassMethodDefinition} from "./../../../../definitions";
import {runBaseClassMethodDefinitionTests} from "./base";
import {runAbstractableDefinitionTests} from "./../base";
import {runClassMethodParameterDefinitionTests} from "./run-class-method-parameter-definition-tests";
import {ensureNotNull} from "./../../ensure-not-null";

export function runClassMethodDefinitionTests(definition: ClassMethodDefinition, structure: ClassMethodStructure) {
    describe(`method ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runAbstractableDefinitionTests(definition, structure);
            runBaseClassMethodDefinitionTests(runClassMethodParameterDefinitionTests, definition, structure);
        });
    });
}
