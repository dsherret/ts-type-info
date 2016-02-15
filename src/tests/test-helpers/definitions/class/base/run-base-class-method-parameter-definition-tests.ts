import {ClassMethodParameterTestStructures} from "./../../../test-structures";
import {ClassMethodParameterDefinitions} from "./../../../../../definitions";
import {runBaseParameterDefinitionTests} from "./../../base";

export function runBaseClassMethodParameterDefinitionTests(definition: ClassMethodParameterDefinitions, structure: ClassMethodParameterTestStructures) {
    describe(`parameter ${structure.name}`, () => {
        runBaseParameterDefinitionTests(definition, structure);
    });
}
