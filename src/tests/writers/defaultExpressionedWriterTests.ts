import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {DefaultExpressionedDefinition, ExpressionDefinition} from "./../../definitions";
import {DefaultExpressionedWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import * as mocks from "./mocks";

describe(nameof(DefaultExpressionedWriter), () => {
    class MockDefinition implements DefaultExpressionedDefinition {
        constructor(expressionText: string | null) {
            if (expressionText != null) {
                this.defaultExpression = new ExpressionDefinition();
                this.defaultExpression!.text = expressionText;
            }
        }

        defaultExpression: ExpressionDefinition | null;
        setDefaultExpression(...params: any[]) { return this; }
    }

    function createObjects(def: MockDefinition) {
        const writer = new CodeBlockWriter();
        const defWriter = new DefaultExpressionedWriter(writer, mocks.getExpressionWriter(writer, [def.defaultExpression]));
        return {writer, defWriter};
    }

    describe(nameof<DefaultExpressionedWriter>(w => w.writeWithEqualsSign), () => {
        function doWriteTest(def: MockDefinition, flags: WriteFlags, expectedText: string) {
            const {writer, defWriter} = createObjects(def);
            defWriter.writeWithEqualsSign(def, flags);
            expect(writer.toString()).to.equal(expectedText);
        }

        it("should write the default expression if the default expression contains non whitespace text and the HideExpressions flag is not on", () => {
            const def = new MockDefinition(`expr`);
            doWriteTest(def, WriteFlags.None, " = {expression:expr}");
        });

        it("should not write the default expression if it contains non whitespace text and the HideExpressions flag is on", () => {
            const def = new MockDefinition(`expr`);
            doWriteTest(def, WriteFlags.HideExpressions, "");
        });

        it("should write nothing if the default expression contains non whitespace text", () => {
            const def = new MockDefinition(`   \t   `);
            doWriteTest(def, WriteFlags.None, "");
        });

        it("should write nothing if the default expression is null", () => {
            const def = new MockDefinition(null);
            doWriteTest(def, WriteFlags.None, "");
        });
    });
});
