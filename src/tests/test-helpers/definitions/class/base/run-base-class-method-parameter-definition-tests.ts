import {ClassMethodParameterStructures} from "./../../../structures";
import {ClassMethodParameterDefinitions} from "./../../../../../definitions";
import {runBaseParameterDefinitionTests} from "./../../base";

export function runBaseClassMethodParameterDefinitionTests(definition: ClassMethodParameterDefinitions, structure: ClassMethodParameterStructures) {
    describe(`parameter ${structure.name}`, () => {
        runBaseParameterDefinitionTests(definition, structure);
    });
}
