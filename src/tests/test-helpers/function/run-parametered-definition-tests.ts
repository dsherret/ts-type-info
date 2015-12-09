import * as assert from "assert";
import {Parameter} from "./../structures";
import {IParameteredDefinition} from "./../../../definitions/function/base/parametered-definition";
import {runParameterDefinitionTests} from "./run-parameter-definition-tests";

export function runParameteredDefinitionTests(definition: IParameteredDefinition, params: Parameter[]) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    it(`should have ${params.length} parameters`, () => {
        assert.equal(definition.parameters.length, params.length);
    });

    definition.parameters.forEach((param, i) => {
        runParameterDefinitionTests(param, params[i]);
    });
}
