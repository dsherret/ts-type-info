import * as assert from "assert";
import {Parameter} from "./structures";
import {IParameteredDefinition} from "./../../definitions/base/parametered-definition";
import {runNamedDefinitionTests} from "./run-named-definition-tests";
import {runTypedDefinitionTests} from "./run-typed-definition-tests";

export function runParameteredDefinitionTests(definition: IParameteredDefinition, params: Parameter[]) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    it(`should have ${params.length} parameters`, () => {
        assert.equal(definition.parameters.length, params.length);
    });

    definition.parameters.forEach((param, i) => {
        describe(`parameter ${params[i].name}`, () => {
            runNamedDefinitionTests(param, params[i].name);
            runTypedDefinitionTests(param, params[i].type);
        });
    });
}
