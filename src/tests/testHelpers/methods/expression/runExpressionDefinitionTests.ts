import * as assert from "assert";
import {ExpressionDefinition} from "./../../../../definitions";
import {ExpressionTestStructure} from "./../../testStructures";
import {runBaseExpressionDefinitionTests} from "./runBaseExpressionDefinitionTests";

export function runExpressionDefinitionTests(definition: ExpressionDefinition, structure: ExpressionTestStructure) {
    if (structure == null) {
        it(`should be null`, () => {
            assert.equal(definition, null);
        });
    }
    else {
        runBaseExpressionDefinitionTests(definition, structure);
    }
}
