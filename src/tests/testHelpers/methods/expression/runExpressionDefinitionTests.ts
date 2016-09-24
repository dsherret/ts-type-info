import * as assert from "assert";
import {ExpressionDefinition} from "./../../../../definitions";
import {ExpressionTestStructure} from "./../../testStructures";
import {runBaseExpressionDefinitionTests} from "./base";
import {ensureNotNull} from "./../../ensureNotNull";

export function runExpressionDefinitionTests(definition: ExpressionDefinition | null, structure: ExpressionTestStructure | undefined) {
    if (structure == null) {
        it(`should be null`, () => {
            assert.equal(definition, null);
        });
    }
    else {
        ensureNotNull(definition, () => {
            runBaseExpressionDefinitionTests(definition!, structure!);
        });
    }
}
