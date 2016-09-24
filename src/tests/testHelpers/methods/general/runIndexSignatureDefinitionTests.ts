import * as assert from "assert";
import {IndexSignatureTestStructure} from "./../../testStructures";
import {IndexSignatureDefinition} from "./../../../../definitions";
import {runBaseDefinitionTests, runReturnTypedDefinitionTests, runReadonlyableDefinitionTests} from "./../base";
import {runTypeDefinitionTests} from "./../expression";
import {ensureNotNull} from "./../../ensureNotNull";

export function runIndexSignatureDefinitionTests(definition: IndexSignatureDefinition, structure: IndexSignatureTestStructure) {
    ensureNotNull(definition, () => {
        runBaseDefinitionTests(definition, structure);
        runReturnTypedDefinitionTests(definition, structure);
        runTypeDefinitionTests(definition.keyType, structure.keyType);
        runReadonlyableDefinitionTests(definition, structure);

        it(`should have the same keyName`, () => {
            assert.equal(definition.keyName, structure.keyName);
        });
    });
}
