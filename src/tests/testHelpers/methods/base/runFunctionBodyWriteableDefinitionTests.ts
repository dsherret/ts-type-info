import * as assert from "assert";
import {FunctionBodyWriteableDefinition} from "./../../../../definitions";
import {FunctionBodyWriteableTestStructure} from "./../../testStructures";

export function runFunctionBodyWriteableDefinitionTests(definition: FunctionBodyWriteableDefinition, structure: FunctionBodyWriteableTestStructure) {
    it(`should ${structure.hasOnWriteFunctionBody ? "have" : "not have"} an onWriteFunctionBody method`, () => {
        assert.equal(typeof definition.onWriteFunctionBody === "function", structure.hasOnWriteFunctionBody || false);
    });
}
