import * as assert from "assert";
import {CallSignatureTestStructure} from "./../../testStructures";
import {CallSignatureDefinition} from "./../../../../definitions";
import {runBaseDefinitionTests, runTypeParameteredDefinitionTests, runParameteredDefinitionTests, runReturnTypedDefinitionTests, runDocumentationedDefinitionTests} from "./../base";
import {runCallSignatureParameterDefinitionTests} from "./runCallSignatureParameterDefinitionTests";
import {ensureNotNull} from "./../../ensureNotNull";

export function runCallSignatureDefinitionTests(definition: CallSignatureDefinition, structure: CallSignatureTestStructure) {
    ensureNotNull(definition, () => {
        runBaseDefinitionTests(definition, structure);
        runTypeParameteredDefinitionTests(definition, structure);
        runParameteredDefinitionTests(runCallSignatureParameterDefinitionTests, definition, structure);
        runReturnTypedDefinitionTests(definition, structure);
        runDocumentationedDefinitionTests(definition, structure);

        it(`should have the same minArgumentCount`, () => {
            assert.equal(definition.getMinArgumentCount(), structure.minArgumentCount || 0);
        });
    });
}
