import {ClassStaticMethodParameterStructure} from "./../../structures";
import {ClassStaticMethodParameterDefinition} from "./../../../../definitions";
import {runBaseClassMethodParameterDefinitionTests} from "./base";

export function runClassStaticMethodParameterDefinitionTests(definition: ClassStaticMethodParameterDefinition, structure: ClassStaticMethodParameterStructure) {
    describe(`parameter ${structure.name}`, () => {
        runBaseClassMethodParameterDefinitionTests(definition, structure);
    });
}
