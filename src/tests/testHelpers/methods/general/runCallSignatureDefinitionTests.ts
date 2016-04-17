import * as assert from "assert";
import {CallSignatureTestStructure} from "./../../testStructures";
import {CallSignatureDefinition} from "./../../../../definitions";
import {runTypeParameteredDefinitionTests, runParameteredDefinitionTests, runReturnTypedDefinitionTests} from "./../base";
import {runCallSignatureParameterDefinitionTests} from "./runCallSignatureParameterDefinitionTests";
import {ensureNotNull} from "./../../ensureNotNull";

export function runCallSignatureDefinitionTests(definition: CallSignatureDefinition, structure: CallSignatureTestStructure) {
    ensureNotNull(definition, () => {
        runTypeParameteredDefinitionTests(definition, structure);
        runParameteredDefinitionTests(runCallSignatureParameterDefinitionTests, definition, structure);
        runReturnTypedDefinitionTests(definition, structure);

        it(`should have a minimum argument count of ${structure.minArgumentCount || 0}`, () => {
            assert.equal(definition.minArgumentCount, structure.minArgumentCount || 0);
        });
    });
}
