import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {InterfaceDefinition} from "./../../definitions";
import {getStringInfo} from "./../../main";
import {InterfaceWriter} from "./../../writers";
import {interfaceWriterTestCode} from "./testCode";

function getInterfaceAsString(i: InterfaceDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new InterfaceWriter(codeBlockWriter);

    writer.write(i);

    return codeBlockWriter.toString();
}

describe("InterfaceWriter", () => {
    const file = getStringInfo(interfaceWriterTestCode);

    describe("write()", () => {
        describe("MyInterface", () => {
            it("should contain the interface written out", () => {
                const expected =
`interface MyInterface {
    myString: string;

    myMethod(): void;
}
`;
                assert.equal(getInterfaceAsString(file.interfaces[0]), expected);
            });
        });

        describe("MyTypeParameterInterface", () => {
            it("should contain the interface written out", () => {
                const expected =
`interface MyTypeParameterInterface<T> {
}
`;
                assert.equal(getInterfaceAsString(file.interfaces[1]), expected);
            });
        });

        describe("MyExtenedInterface", () => {
            it("should contain the interface written out", () => {
                const expected =
`interface MyExtenedInterface extends MyTypeParameterInterface<string> {
}
`;
                assert.equal(getInterfaceAsString(file.interfaces[2]), expected);
            });
        });
    });
});
