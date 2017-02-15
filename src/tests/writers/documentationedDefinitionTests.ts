import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {DocumentationedDefinition} from "./../../definitions";
import {DocumentationedWriter} from "./../../writers";

describe(nameof(DocumentationedWriter), () => {
    class MockDocumentationedDefinition extends DocumentationedDefinition {
    }

    function getWriteResult(documentationComment: string) {
        const codeWriter = new CodeBlockWriter();
        const writer = new DocumentationedWriter(codeWriter);
        const def = new MockDocumentationedDefinition();
        def.documentationComment = documentationComment;
        writer.write(def);
        return codeWriter.toString();
    }

    function doTest(commentText: string, expectedText: string) {
        if (expectedText.length > 0)
            expectedText += "\n";
        expect(getWriteResult(commentText)).to.equal(expectedText);
    }

    describe(nameof<DocumentationedWriter>(w => w.write), () => {
        it("should write the comment when providing a comment", () => {
            const fullComment = "/**\n * TestComment\n * NextLine\n */";
            doTest(fullComment, fullComment);
        });

        it("should write the comment when providing just text", () => {
            doTest("TestComment\nNextLine\r\n", "/**\n * TestComment\n * NextLine\n *\n */");
        });

        it("should not write if the comment is null", () => {
            doTest(null as any as string, "");
        });

        it("should not write if the comment is an empty string", () => {
            doTest("", "");
        });

        it("should not write if the comment contains spaces", () => {
            doTest("    \t    ", "");
        });
    });
});
