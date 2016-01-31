import * as assert from "assert";
import {ParameteredStructures, ParameterStructures} from "./../../../structures";
import {ParameteredDefinitions, ParameterDefinitions} from "./../../../../../definitions";

export function runParameteredDefinitionTests(
    runParameterDefinitionTests: (definition: ParameterDefinitions, structure: ParameterStructures) => void,
    definition: ParameteredDefinitions,
    structure: ParameteredStructures
) {
    describe("parameters", () => {
        structure.parameters = structure.parameters || [];

        it(`should have ${structure.parameters.length} parameter(s)`, () => {
            assert.equal(definition.parameters.length, structure.parameters.length);
        });

        structure.parameters.forEach((param, i) => {
            runParameterDefinitionTests(definition.parameters[i], param);
        });
    });
}
