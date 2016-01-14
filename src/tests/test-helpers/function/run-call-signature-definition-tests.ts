import * as assert from "assert";
import {CallSignature} from "./../structures";
import {runParameteredDefinitionTests, runReturnTypedDefinitionTests} from "./base";
import {CallSignatureDefinition} from "./../../../definitions";
import {runTypeParameteredDefinitionTests} from "./../base";
import {runParameterDefinitionTests} from "./run-parameter-definition-tests";

export function runCallSignatureDefinitionTests(definition: CallSignatureDefinition, structure: CallSignature) {
    describe(`call signature`, () => {
        runTypeParameteredDefinitionTests(definition, structure);
        runParameteredDefinitionTests(runParameterDefinitionTests, definition, structure);
        runReturnTypedDefinitionTests(definition, structure);

        it(`should have a minimum argument count of ${structure.minArgumentCount || 0}`, () => {
            assert.equal(definition.minArgumentCount, structure.minArgumentCount || 0);
        });
    });
}
