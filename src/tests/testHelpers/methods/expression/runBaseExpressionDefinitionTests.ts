import * as assert from "assert";
import {BaseExpressionDefinition} from "./../../../../definitions";
import {BaseExpressionTestStructure} from "./../../testStructures";
import {runBaseDefinitionTests} from "./../base";

export function runBaseExpressionDefinitionTests(definition: BaseExpressionDefinition, structure: BaseExpressionTestStructure) {
    runBaseDefinitionTests(definition, structure);

    it(`should have the text ${structure.text}`, () => {
        assert.equal(definition.text, structure.text);
    });
}
