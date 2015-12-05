import * as assert from "assert";
import {Parameter} from "./structures";
import {ParameterDefinition} from "./../../definitions";
import {runNamedDefinitionTests} from "./run-named-definition-tests";
import {runTypedDefinitionTests} from "./run-typed-definition-tests";

export function runParameterDefinitionTests(definition: ParameterDefinition, param: Parameter) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    describe(`parameter ${param.name}`, () => {
        runNamedDefinitionTests(definition, param.name);
        runTypedDefinitionTests(definition, param.type);

        it(`should be ${!param.isRequired ? "required" : "not required"}`, () => {
            assert.equal(definition.isRequired, param.isRequired);
        });
    });
}
