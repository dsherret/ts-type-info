import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {ClassDefinition} from "./../../definitions";
import {getStringInfo} from "./../../main";
import {ClassWriter} from "./../../writers";
import {classWriterTestCode} from "./testCode";

function getClassAsString(c: ClassDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new ClassWriter(codeBlockWriter);

    writer.write(c);

    return codeBlockWriter.toString();
}

describe("ClassWriter", () => {
    const file = getStringInfo(classWriterTestCode);

    describe("write()", () => {
        describe("MyClass", () => {
            it("should contain the class written out", () => {
                const expected =
`abstract class MyClass {
    constructor(myParam: string, public myPublicParam: any, protected myProtectedParam: any, private myPrivateParam: any) {
    }

    myString: string;
    private myPrivateString: string;

    abstract myAbstractMethod(): string;
    abstract myAbstractMethod2(): string;

    myMethod(): void {
    }

    private myPrivateMethod(): void {
    }
}
`;
                assert.equal(getClassAsString(file.classes[0]), expected);
            });
        });

        describe("MyTypeParameterClass", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyTypeParameterClass<T> {
}
`;
                assert.equal(getClassAsString(file.classes[1]), expected);
            });
        });

        describe("MyChildClass", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyChildClass extends MyTypeParameterClass<string> {
}
`;
                assert.equal(getClassAsString(file.classes[2]), expected);
            });
        });

        describe("MyImplementsClass", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyImplementsClass implements MyChildClass {
}
`;
                assert.equal(getClassAsString(file.classes[3]), expected);
            });
        });

        describe("MyExtendsImplementsClass", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyExtendsImplementsClass extends MyChildClass implements MyImplementsClass {
}
`;
                assert.equal(getClassAsString(file.classes[4]), expected);
            });
        });
    });
});
