import {ClassStaticMethodStructure} from "./../../structures";
import {ClassStaticMethodDefinition} from "./../../../../definitions";
import {runBaseClassMethodDefinitionTests} from "./base";

export function runClassStaticMethodDefinitionTests(definition: ClassStaticMethodDefinition, structure: ClassStaticMethodStructure) {
    describe(`static method ${structure.name}`, () => {
        runBaseClassMethodDefinitionTests(definition, structure);
    });
}
