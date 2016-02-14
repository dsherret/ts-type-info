import {ClassStaticMethodStructure} from "./../../structures";
import {ClassStaticMethodDefinition} from "./../../../../definitions";
import {runBaseClassMethodDefinitionTests} from "./base";
import {runClassStaticMethodParameterDefinitionTests} from "./run-class-static-method-parameter-definition-tests";
import {ensureNotNull} from "./../../ensure-not-null";

export function runClassStaticMethodDefinitionTests(definition: ClassStaticMethodDefinition, structure: ClassStaticMethodStructure) {
    describe(`static method ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBaseClassMethodDefinitionTests(runClassStaticMethodParameterDefinitionTests, definition, structure);
        });
    });
}
