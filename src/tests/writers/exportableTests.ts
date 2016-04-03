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

describe("Exportable", () => {
    describe("named exports", () => {
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
        const myFile = getInfoFromString(code);

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

export function myFunction() {
}
`;
                assert.equal(getFileAsString(myFile), expected);
            });
        });
    });

    describe("default exports", () => {
        it("should write export default for a namespace", () => {
            const code = `namespace MyNamespace {}\nexport default MyNamespace;`;
            const expected = `namespace MyNamespace {\n}\n\nexport default MyNamespace;\n`;
            assert.equal(getFileAsString(getInfoFromString(code)), expected);
        });

        it("should write export default for a module", () => {
            const code = `module MyModule {}\nexport default MyModule;`;
            const expected = `module MyModule {\n}\n\nexport default MyModule;\n`;
            assert.equal(getFileAsString(getInfoFromString(code)), expected);
        });

        it("should write export default for an interface", () => {
            const code = `interface MyInterface {}\nexport default MyInterface;`;
            const expected = `interface MyInterface {\n}\n\nexport default MyInterface;\n`;
            assert.equal(getFileAsString(getInfoFromString(code)), expected);
        });

        it("should write export default for a class", () => {
            const code = `class MyClass {}\nexport default MyClass;`;
            const expected = `class MyClass {\n}\n\nexport default MyClass;\n`;
            assert.equal(getFileAsString(getInfoFromString(code)), expected);
        });

        it("should write export default for an enum", () => {
            const code = `enum MyEnum {}\nexport default MyEnum;`;
            const expected = `enum MyEnum {\n}\n\nexport default MyEnum;\n`;
            assert.equal(getFileAsString(getInfoFromString(code)), expected);
        });

        it("should write export default for a function", () => {
            const code = `function MyFunction() {}\nexport default MyFunction;`;
            const expected = `function MyFunction() {\n}\n\nexport default MyFunction;\n`;
            assert.equal(getFileAsString(getInfoFromString(code)), expected);
        });
    });
});
