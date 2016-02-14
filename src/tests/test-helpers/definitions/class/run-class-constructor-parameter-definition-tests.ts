import {ClassConstructorParameterStructure} from "./../../structures";
import {ClassConstructorParameterDefinition} from "./../../../../definitions";
import {runBaseParameterDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensure-not-null";

export function runClassConstructorParameterDefinitionTests(definition: ClassConstructorParameterDefinition, structure: ClassConstructorParameterStructure) {
    describe(`parameter ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBaseParameterDefinitionTests(definition, structure);
        });
    });
}
