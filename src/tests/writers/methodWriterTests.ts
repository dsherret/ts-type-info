import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {MethodDefinitions} from "./../../definitions";
import {getInfoFromString} from "./../../main";
import {MethodWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";

function getMethodAsString(method: MethodDefinitions) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new MethodWriter(codeBlockWriter);

    writer.write(method, WriteFlags.Default);

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

    abstract myAbstractMethod(): string;
}
`;
    const myClass = getInfoFromString(code).classes[0];

    describe("write()", () => {
        describe("myMethod", () => {
            it("should contain the method written out with the function body", () => {
                assert.equal(getMethodAsString(myClass.methods[0]), "myMethod<T extends string, U>(t: T, u: U) {\n}\n");
            });
        });

        describe("myProtectedMethod", () => {
            it("should contain the method written out", () => {
                assert.equal(getMethodAsString(myClass.methods[1]), "protected myProtectedMethod(myParam: string) {\n}\n");
            });
        });

        describe("myPrivateMethod", () => {
            it("should contain the method written out", () => {
                assert.equal(getMethodAsString(myClass.methods[2]), "private myPrivateMethod() {\n}\n");
            });

            it("should contain the method written out but ignore the return type when specifying onWriteFunctionBody", () => {
                myClass.methods[2].onWriteFunctionBody = writer => { writer.write("return 'test';"); };
                assert.equal(getMethodAsString(myClass.methods[2]), "private myPrivateMethod() {\n    return 'test';\n}\n");
            });
        });

        describe("myAbstractMethod", () => {
            it("should be written out as-is", () => {
                assert.equal(getMethodAsString(myClass.methods[3]), "abstract myAbstractMethod(): string;\n");
            });
        });
    });
});
