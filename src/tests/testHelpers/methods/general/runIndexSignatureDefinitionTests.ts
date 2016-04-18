import * as assert from "assert";
import {IndexSignatureTestStructure} from "./../../testStructures";
import {IndexSignatureDefinition} from "./../../../../definitions";
import {runReturnTypedDefinitionTests} from "./../base";
import {runTypeExpressionDefinitionTests} from "./../expressions";
import {ensureNotNull} from "./../../ensureNotNull";

export function runIndexSignatureDefinitionTests(definition: IndexSignatureDefinition, structure: IndexSignatureTestStructure) {
    ensureNotNull(definition, () => {
        runReturnTypedDefinitionTests(definition, structure);
        runTypeExpressionDefinitionTests(definition.keyTypeExpression, structure.keyTypeExpression);

        it(`should have the same keyName`, () => {
            assert.equal(definition.keyName, structure.keyName);
        });
    });
}
