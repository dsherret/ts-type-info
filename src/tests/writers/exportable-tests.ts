import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {FileDefinition} from "./../../definitions";
import {getStringInfo} from "./../../main";
import {FileWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";

function getFileAsString(f: FileDefinition, flags: WriteFlags) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new FileWriter(codeBlockWriter);

    writer.write(f, flags);

    return codeBlockWriter.toString();
}

describe("Exportable", () => {
    const code = `
export namespace MyNamespace {
}
export module MyModule {
}
export interface MyInterface {
}
export class MyClass {
}
export enum MyEnum {
}
export function myFunction(): void;
`;
    const myFile = getStringInfo(code);

    describe("write()", () => {
        it("should contain the file written out with export keywords", () => {
            const expected =
`export namespace MyNamespace {
}

export module MyModule {
}

export interface MyInterface {
}

export class MyClass {
}

export enum MyEnum {
}

export function myFunction(): void {
}
`;
            assert.equal(getFileAsString(myFile, WriteFlags.None), expected);
        });
    });
});
