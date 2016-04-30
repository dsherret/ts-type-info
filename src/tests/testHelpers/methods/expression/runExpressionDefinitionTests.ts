import * as assert from "assert";
import {ExpressionDefinition} from "./../../../../definitions";
import {ExpressionTestStructure} from "./../../testStructures";
import {runBaseDefinitionTests} from "./../base";

export function runExpressionDefinitionTests(definition: ExpressionDefinition, structure: ExpressionTestStructure) {
    if (structure == null) {
        it(`should be null`, () => {
            assert.equal(definition, null);
        });
    }
    else {
        runBaseDefinitionTests(definition, structure);

        it(`should have the text ${structure.text}`, () => {
            assert.equal(definition.text, structure.text);
        });
    }
}
