import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {ExpressionDefinition} from "./../../definitions";
import {ExpressionWriter} from "./../../writers";

describe(nameof(ExpressionWriter), () => {
    function createObjects() {
        const writer = new CodeBlockWriter();
        const defWriter = new ExpressionWriter(writer);
        return {writer, defWriter};
    }

    describe(nameof<ExpressionWriter>(w => w.write), () => {
        function doWriteTest(def: ExpressionDefinition | null, expectedText: string) {
            const {writer, defWriter} = createObjects();
            defWriter.write(def);
            expect(writer.toString()).to.equal(expectedText);
        }

        it("should write the text", () => {
            const def = new ExpressionDefinition();
            def.text = "text";
            doWriteTest(def, "text");
        });

        it("should not write the text if the definition is null", () => {
            doWriteTest(null, "");
        });

        it("should not write the text if the definition text is null", () => {
            const def = new ExpressionDefinition();
            doWriteTest(def, "");
        });

        it("should not write the text if the definition text is empty", () => {
            const def = new ExpressionDefinition();
            def.text = "";
            doWriteTest(def, "");
        });

        it("should not write the text if the definition text is whitespace", () => {
            const def = new ExpressionDefinition();
            def.text = "   \t   ";
            doWriteTest(def, "");
        });
    });

    describe(nameof<ExpressionWriter>(w => w.writeWithEqualsSign), () => {
        function doWriteWithEqualsSignTest(def: ExpressionDefinition | null, expectedText: string) {
            const {writer, defWriter} = createObjects();
            defWriter.writeWithEqualsSign(def);
            expect(writer.toString()).to.equal(expectedText);
        }

        it("should write the text", () => {
            const def = new ExpressionDefinition();
            def.text = "text";
            doWriteWithEqualsSignTest(def, " = text");
        });

        it("should not write the text if the definition is null", () => {
            doWriteWithEqualsSignTest(null, "");
        });

        it("should not write the text if the definition text is null", () => {
            const def = new ExpressionDefinition();
            doWriteWithEqualsSignTest(def, "");
        });

        it("should not write the text if the definition text is empty", () => {
            const def = new ExpressionDefinition();
            def.text = "";
            doWriteWithEqualsSignTest(def, "");
        });

        it("should not write the text if the definition text is whitespace", () => {
            const def = new ExpressionDefinition();
            def.text = "   \t   ";
            doWriteWithEqualsSignTest(def, "");
        });
    });
});
