import * as assert from "assert";
import {Parameter, Parametered} from "./../../structures";
import {IParameteredDefinition, BaseParameterDefinition} from "./../../../../definitions";

export function runParameteredDefinitionTests<T extends BaseParameterDefinition, U extends Parameter>(
    runParameterDefinitionTests: (definition: T, structure: U) => void,
    definition: IParameteredDefinition<T>,
    structure: Parametered<U>) {

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
