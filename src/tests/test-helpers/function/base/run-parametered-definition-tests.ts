import * as assert from "assert";
import {Parameter} from "./../../structures";
import {IParameteredDefinition, BaseParameterDefinition} from "./../../../../definitions";
import {runBaseParameterDefinitionTests} from "./run-base-parameter-definition-tests";

export function runParameteredDefinitionTests<T extends BaseParameterDefinition>(definition: IParameteredDefinition<T>, params: Parameter[]) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    it(`should have ${params.length} parameters`, () => {
        assert.equal(definition.parameters.length, params.length);
    });

    definition.parameters.forEach((param, i) => {
        runBaseParameterDefinitionTests(param, params[i]);
    });
}
