import * as assert from "assert";
import {getInfoFromString} from "./../../../main";

describe("ExportableDefinition", () => {
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
export function myFunction() {
}
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
                assert.equal(myFile.write(), expected);
            });
        });
    });

    describe("default export statements", () => {
        it("should write export default for a namespace", () => {
            const code = `namespace MyNamespace {}\nexport default MyNamespace;`;
            const expected = `namespace MyNamespace {\n}\n\nexport default MyNamespace;\n`;
            assert.equal(getInfoFromString(code).write(), expected);
        });

        it("should write export default for a module", () => {
            const code = `module MyModule {}\nexport default MyModule;`;
            const expected = `module MyModule {\n}\n\nexport default MyModule;\n`;
            assert.equal(getInfoFromString(code).write(), expected);
        });

        it("should write export default for an interface", () => {
            const code = `interface MyInterface {}\nexport default MyInterface;`;
            const expected = `interface MyInterface {\n}\n\nexport default MyInterface;\n`;
            assert.equal(getInfoFromString(code).write(), expected);
        });

        it("should write export default for a class", () => {
            const code = `class MyClass {}\nexport default MyClass;`;
            const expected = `class MyClass {\n}\n\nexport default MyClass;\n`;
            assert.equal(getInfoFromString(code).write(), expected);
        });

        it("should write export default for an enum", () => {
            const code = `enum MyEnum {}\nexport default MyEnum;`;
            const expected = `enum MyEnum {\n}\n\nexport default MyEnum;\n`;
            assert.equal(getInfoFromString(code).write(), expected);
        });

        it("should write export default for a function", () => {
            const code = `function MyFunction() {}\nexport default MyFunction;`;
            const expected = `function MyFunction() {\n}\n\nexport default MyFunction;\n`;
            assert.equal(getInfoFromString(code).write(), expected);
        });
    });
});
