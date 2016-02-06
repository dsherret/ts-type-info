import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {TypeExpressionWriter} from "./../../writers";
import {TypeExpression} from "./../../expressions";
import {getStringInfo} from "./../../main";
import {WriteFlags} from "./../../write-flags";

function getTypeExpressionAsString(typeExpression: TypeExpression) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new TypeExpressionWriter(codeBlockWriter, WriteFlags.Default);

    writer.write(typeExpression);

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
    const myClass = getStringInfo(code).classes[0];

    describe("write()", () => {
        describe("myProperty1", () => {
            it("should contain the property written out", () => {
                assert.equal(getTypeExpressionAsString(myClass.properties[0].typeExpression), "string");
            });
        });

        describe("myProperty2", () => {
            it("should contain the property written out", () => {
                assert.equal(getTypeExpressionAsString(myClass.properties[1].typeExpression), "MyTest<string>");
            });
        });
    });
});
