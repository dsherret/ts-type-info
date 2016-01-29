import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {ClassDefinition} from "./../../definitions";
import {getStringInfo} from "./../../main";
import {ClassWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";
import {classWriterTestCode} from "./test-code";

function getClassAsString(c: ClassDefinition, flags: WriteFlags) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new ClassWriter(codeBlockWriter);

    writer.write(c, flags);

    return codeBlockWriter.toString();
}

describe("ClassWriter", () => {
    const file = getStringInfo(classWriterTestCode);

    describe("write()", () => {
        describe("MyClass", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyClass {
    private myString: string;

    myMethod(): void;
}
`;
                assert.equal(getClassAsString(file.classes[0], WriteFlags.None), expected);
            });
        });

        describe("MyTypeParameterClass", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyTypeParameterClass<T> {
}
`;
                assert.equal(getClassAsString(file.classes[1], WriteFlags.None), expected);
            });
        });

        describe("MyChildClass", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyChildClass extends MyTypeParameterClass<string> {
}
`;
                assert.equal(getClassAsString(file.classes[2], WriteFlags.None), expected);
            });
        });

        describe("MyImplementsClass", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyImplementsClass implements MyChildClass {
}
`;
                assert.equal(getClassAsString(file.classes[3], WriteFlags.None), expected);
            });
        });

        describe("MyExtendsImplementsClass", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyExtendsImplementsClass extends MyChildClass implements MyImplementsClass {
}
`;
                assert.equal(getClassAsString(file.classes[4], WriteFlags.None), expected);
            });
        });
    });
});
