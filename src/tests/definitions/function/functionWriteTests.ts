import * as assert from "assert";
import {getInfoFromString} from "./../../../main";

const code = `
function myFunction(str: string) {
    return "";
}
function myFunction2<T extends string, U>(str: T, num: U) {
}
export function myMultipleSignatures(): string;
export function myMultipleSignatures(str?: string) {
    return "";
}
declare function myDeclareMultipleSignatures(): string;
declare function myDeclareMultipleSignatures(str?: string): string;
function myFunctionBodyWriter() {
    return "";
}
`;

describe("FunctionDefinition", () => {
    const file = getInfoFromString(code);

    describe("write()", () => {
        describe("myFunction", () => {
            it("should contain the function written out", () => {
                const expected =
`function myFunction(str: string) {
}
`;
                assert.equal(file.functions[0].write(), expected);
            });
        });

        describe("myFunction2", () => {
            it("should contain the function written out", () => {
                const expected =
`function myFunction2<T extends string, U>(str: T, num: U) {
}
`;
                assert.equal(file.functions[1].write(), expected);
            });
        });

        describe("myMultipleSignatures", () => {
            it("should contain the function written out", () => {
                const expected =
`export function myMultipleSignatures(): string;
export function myMultipleSignatures(str?: string): string {
}
`;
                assert.equal(file.functions[2].write(), expected);
            });
        });
        describe("myDeclareMultipleSignatures", () => {
            it("should contain the function written out", () => {
                const expected =
`declare function myDeclareMultipleSignatures(): string;
declare function myDeclareMultipleSignatures(str?: string): string;
`;
                assert.equal(file.functions[3].write(), expected);
            });
        });

        describe("onWriteFunctionBody", () => {
            const funcDef = file.functions[4];

            funcDef.onWriteFunctionBody = (writer) => {
                writer.write(`return "text";`);
            };

            it(`should write the function with a body`, () => {
                const expected = `function myFunctionBodyWriter() {\n    return "text";\n}\n`;
                assert.equal(funcDef.write(), expected);
            });
        })
    });
});
