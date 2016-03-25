import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {TypeExpressionWriter} from "./../../writers";
import {TypeExpressionDefinition} from "./../../definitions";
import {getInfoFromString} from "./../../main";

function getTypeExpressionAsString(typeExpression: TypeExpressionDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new TypeExpressionWriter(codeBlockWriter);

    writer.writeWithColon(typeExpression);

    return codeBlockWriter.toString();
}

describe("TypeExpressionWriter", () => {
    const code = `
class MyClass {
    myProperty1: string;
    myProperty2: MyTest<string>;
}

interface MyTest<T> {
    name: T;
}
`;
    const myClass = getInfoFromString(code).classes[0];

    describe("writeWithColon()", () => {
        describe("myProperty1", () => {
            it("should contain the property written out", () => {
                assert.equal(getTypeExpressionAsString(myClass.properties[0].typeExpression), ": string");
            });
        });

        describe("myProperty2", () => {
            it("should contain the property written out", () => {
                assert.equal(getTypeExpressionAsString(myClass.properties[1].typeExpression), ": MyTest<string>");
            });
        });

        it("should not write anything when providing null", () => {
            assert.equal(getTypeExpressionAsString(null), "");
        });
    });
});
