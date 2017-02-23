import * as assert from "assert";
import {ParameteredTestStructures, ParameterTestStructures, BaseClassMethodParameterTestStructure} from "./../../testStructures";
import {ParameteredDefinitions, ParameterDefinitions} from "./../../../../definitions";
import {ensureNotNull} from "./../../ensureNotNull";

export function runParameteredDefinitionTests(
    runParameterDefinitionTests: (definition: ParameterDefinitions, structure: ParameterTestStructures) => void,
    definition: ParameteredDefinitions,
    structure: ParameteredTestStructures
) {
    describe("parameters", () => {
        structure.parameters = structure.parameters || [];

        it(`should have ${structure.parameters.length} parameter(s)`, () => {
            assert.equal(definition.parameters.length, structure.parameters!.length);
        });

        // todo: why do I need to do this madness?
        let parameters = structure.parameters as any as BaseClassMethodParameterTestStructure[];
        parameters.forEach((param, i) => {
            ensureNotNull(definition.parameters[i], () => {
                runParameterDefinitionTests(definition.parameters[i], param);
            });
        });
    });
}
