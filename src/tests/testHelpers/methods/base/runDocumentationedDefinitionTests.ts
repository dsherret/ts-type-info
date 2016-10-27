import * as assert from "assert";
import {DocumentationedDefinition} from "./../../../../definitions";
import {DocumentationedTestStructure} from "./../../testStructures";

export function runDocumentationedDefinitionTests(definition: DocumentationedDefinition, structure: DocumentationedTestStructure) {
    structure.documentationComment = structure.documentationComment || "";

    it(`should have a documentation comment text of ${structure.documentationComment}`, () => {
        let actualText = definition.documentationComment;
        if (typeof definition.documentationComment === "string" && definition.documentationComment.length > 0)
            actualText = actualText.replace(/\r?\n/, "\n");
        assert.equal(actualText, structure.documentationComment);
    });
}
