import * as assert from "assert";
import {JsDocedDefinition} from "./../../../../definitions";
import {JsDocedTestStructure} from "./../../testStructures";

export function runJsDocedDefinitionTests(definition: JsDocedDefinition, structure: JsDocedTestStructure) {
    structure.jsDocText = structure.jsDocText || "";

    it(`should have a js doc text of ${structure.jsDocText}`, () => {
        let actualText = definition.jsDocText;
        if (typeof definition.jsDocText === "string" && definition.jsDocText.length > 0)
            actualText = actualText.replace(/\r?\n/, "\n");
        assert.equal(actualText, structure.jsDocText);
    });
}
