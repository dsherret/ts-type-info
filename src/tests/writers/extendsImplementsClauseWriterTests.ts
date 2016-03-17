import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {ClassDefinition} from "./../../definitions";
import {getInfoFromString} from "./../../main";
import {WriteFlags} from "./../../WriteFlags";
import {ExtendsImplementsClauseWriter} from "./../../writers";

function getStringUsingWriter(writeFuncCallback: (writer: ExtendsImplementsClauseWriter) => void) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new ExtendsImplementsClauseWriter(codeBlockWriter, WriteFlags.Default);

    writeFuncCallback(writer);

    return codeBlockWriter.toString();
}

describe("ExtendsImplementsClauseWriter", () => {
    const code = `
interface MyInterface {
    name: string;
}

class MyBaseClass {
    prop: string;
}

class MyClass extends MyBaseClass implements MyInterface {
    name: string;
}

class MyClass2 implements MyInterface, MyBaseClass {
}

class ArrayClass extends Array<string> implements Array<string> {
}
`;
    const file = getInfoFromString(code);
    const myBaseClass = file.classes[0];
    const myClass = file.classes[1];
    const myClass2 = file.classes[2];
    const arrayClass = file.classes[3];

    describe("writeExtends()", () => {
        describe("0 types", () => {
            const str = getStringUsingWriter(writer => {
                writer.writeExtends(myBaseClass);
            });

            it("should be a blank string", () => {
                assert.equal(str, "");
            });
        });

        describe("1 type", () => {
            const str = getStringUsingWriter(writer => {
                writer.writeExtends(myClass);
            });

            it("should have the one type written out", () => {
                assert.equal(str, " extends MyBaseClass");
            });
        });

        describe("2 types", () => {
            const str = getStringUsingWriter(writer => {
                writer.writeExtends({
                    extendsTypeExpressions: [
                        { text: "string", types: [] },
                        { text: "number", types: [] }
                    ]
                } as ClassDefinition);
            });

            it("should have the two types written out separated by a comma", () => {
                assert.equal(str, " extends string, number");
            });
        });

        describe("Array type", () => {
            const str = getStringUsingWriter(writer => {
                writer.writeExtends(arrayClass);
            });

            it("should write the array type as a generic type", () => {
                assert.equal(str, " extends Array<string>");
            });
        });
    });

    describe("writeImplements()", () => {
        describe("0 types", () => {
            const str = getStringUsingWriter(writer => {
                writer.writeImplements(myBaseClass);
            });

            it("should be a blank string", () => {
                assert.equal(str, "");
            });
        });

        describe("1 type", () => {
            const str = getStringUsingWriter(writer => {
                writer.writeImplements(myClass);
            });

            it("should have the one type written out", () => {
                assert.equal(str, " implements MyInterface");
            });
        });

        describe("2 types", () => {
            const str = getStringUsingWriter(writer => {
                writer.writeImplements(myClass2);
            });

            it("should have the two types written out separated by a comma", () => {
                assert.equal(str, " implements MyInterface, MyBaseClass");
            });
        });

        describe("Array type", () => {
            const str = getStringUsingWriter(writer => {
                writer.writeImplements(arrayClass);
            });

            it("should write the array type as a generic type", () => {
                assert.equal(str, " implements Array<string>");
            });
        });
    });
});
