import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {InterfaceDefinition} from "./../../definitions";
import {getStringInfo} from "./../../main";
import {InterfaceWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";

function getInterfaceAsString(i: InterfaceDefinition, flags: WriteFlags) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new InterfaceWriter(codeBlockWriter);

    writer.write(i, flags);

    return codeBlockWriter.toString();
}

describe("InterfaceWriter", () => {
    const code = `
interface MyInterface {
    myString: string;
    myMethod(): void;
}

interface MyTypeParameterInterface<T> {
}

interface MyExtenedInterface extends MyTypeParameterInterface<string> {
}
`;
    const file = getStringInfo(code);

    describe("write()", () => {
        describe("MyInterface", () => {
            it("should contain the interface written out", () => {
                const expected =
`interface MyInterface {
    myString: string;

    myMethod(): void;
}
`;
                assert.equal(getInterfaceAsString(file.interfaces[0], WriteFlags.None), expected);
            });
        });

        describe("MyTypeParameterInterface", () => {
            it("should contain the interface written out", () => {
                const expected =
`interface MyTypeParameterInterface<T> {
}
`;
                assert.equal(getInterfaceAsString(file.interfaces[1], WriteFlags.None), expected);
            });
        });

        describe("MyExtenedInterface", () => {
            it("should contain the interface written out", () => {
                const expected =
`interface MyExtenedInterface extends MyTypeParameterInterface<string> {
}
`;
                assert.equal(getInterfaceAsString(file.interfaces[2], WriteFlags.None), expected);
            });
        });
    });
});
