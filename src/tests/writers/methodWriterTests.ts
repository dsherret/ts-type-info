import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {MethodWriter} from "./../../writers";
import {MethodDefinitions} from "./../../definitions";
import {getStringInfo} from "./../../main";

function getMethodAsString(method: MethodDefinitions) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new MethodWriter(codeBlockWriter);

    writer.write(method);

    return codeBlockWriter.toString();
}

describe("MethodWriter", () => {
    const code = `
class MyClass {
    myMethod<T extends string, U>(t: T, u: U) {
    }

    protected myProtectedMethod(myParam: string) {
        return 12;
    }

    private myPrivateMethod() {
        return "";
    }
}
`;
    const myClass = getStringInfo(code).classes[0];

    describe("write()", () => {
        describe("myMethod", () => {
            it("should contain the method written out with the function body", () => {
                assert.equal(getMethodAsString(myClass.methods[0]), "myMethod<T extends string, U>(t: T, u: U): void {\n}\n");
            });
        });

        describe("myProtectedMethod", () => {
            it("should contain the method written out", () => {
                assert.equal(getMethodAsString(myClass.methods[1]), "protected myProtectedMethod(myParam: string): number {\n}\n");
            });
        });

        describe("myPrivateMethod", () => {
            it("should contain the method written out", () => {
                assert.equal(getMethodAsString(myClass.methods[2]), "private myPrivateMethod(): string {\n}\n");
            });
        });
    });
});
