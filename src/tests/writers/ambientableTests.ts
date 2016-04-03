import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {FileDefinition} from "./../../definitions";
import {getInfoFromString} from "./../../main";
import {FileWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";

function getFileAsString(f: FileDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new FileWriter(codeBlockWriter);

    writer.write(f, WriteFlags.Default);

    return codeBlockWriter.toString();
}

describe("Ambientable", () => {
    const code = `
declare namespace MyNamespace {
}
declare module MyModule {
}
declare namespace MyOtherNamespace {
    interface myOtherInterface {}
    function myOtherFunction(): void;
}
declare interface MyInterface {
}
declare class MyClass {
}
declare enum MyEnum {
}
declare function myFunction(): void;
`;
    const myFile = getInfoFromString(code);

    describe("write()", () => {
        it("should contain the file written out with declare keywords", () => {
            const expected =
`declare namespace MyNamespace {
}

declare module MyModule {
}

declare namespace MyOtherNamespace {
    interface myOtherInterface {
    }

    function myOtherFunction(): void;
}

declare interface MyInterface {
}

declare class MyClass {
}

declare enum MyEnum {
}

declare function myFunction(): void;
`;
            assert.equal(getFileAsString(myFile), expected);
        });
    });
});
