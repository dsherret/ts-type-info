import {ClassStaticMethodTestStructure} from "./../../test-structures";
import {ClassStaticMethodDefinition} from "./../../../../definitions";
import {runBaseClassMethodDefinitionTests} from "./base";
import {runClassStaticMethodParameterDefinitionTests} from "./run-class-static-method-parameter-definition-tests";
import {ensureNotNull} from "./../../ensure-not-null";

export function runClassStaticMethodDefinitionTests(definition: ClassStaticMethodDefinition, structure: ClassStaticMethodTestStructure) {
    describe(`static method ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBaseClassMethodDefinitionTests(runClassStaticMethodParameterDefinitionTests, definition, structure);
        });
    });
}
