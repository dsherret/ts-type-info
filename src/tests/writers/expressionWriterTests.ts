import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {ExpressionWriter} from "./../../writers";
import {Expression} from "./../../expressions";
import {WriteFlags} from "./../../writeFlags";
import {getStringInfo} from "./../../main";

function getExpressionAsString(typeExpression: Expression) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new ExpressionWriter(codeBlockWriter, WriteFlags.Default);

    writer.writeWithEqualsSign(typeExpression);

    return codeBlockWriter.toString();
}

describe("ExpressionWriter", () => {
    const code = `
class MyClass {
    myProperty1 = "my text";
}
`;
    const myClass = getStringInfo(code).classes[0];

    describe("writeWithEqualsSign()", () => {
        describe("myProperty1 defaultExpression", () => {
            it("should contain the default expression written out", () => {
                assert.equal(getExpressionAsString(myClass.properties[0].defaultExpression), ` = "my text"`);
            });
        });

        it("should not write anything when providing a null object", () => {
            assert.equal(getExpressionAsString(null), "");
        });
    });
});
