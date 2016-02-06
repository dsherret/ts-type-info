import * as assert from "assert";
import {CallSignatureStructure} from "./../../structures";
import {CallSignatureDefinition} from "./../../../../definitions";
import {runTypeParameteredDefinitionTests, runParameteredDefinitionTests, runReturnTypedDefinitionTests} from "./../base";
import {runCallSignatureParameterDefinitionTests} from "./run-call-signature-parameter-definition-tests";

export function runCallSignatureDefinitionTests(definition: CallSignatureDefinition, structure: CallSignatureStructure) {
    describe(`call signature`, () => {
        runTypeParameteredDefinitionTests(definition, structure);
        runParameteredDefinitionTests(runCallSignatureParameterDefinitionTests, definition, structure);
        runReturnTypedDefinitionTests(definition, structure);

        it(`should have a minimum argument count of ${structure.minArgumentCount || 0}`, () => {
            assert.equal(definition.minArgumentCount, structure.minArgumentCount || 0);
        });
    });
}
