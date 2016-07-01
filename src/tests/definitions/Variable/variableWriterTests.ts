import * as assert from "assert";
import {getInfoFromString} from "./../../../main";

const code = `
var myImplicitAny;
var myExplicitTypeVar: number;
var myImplicitTypeVar = "my string";
let myLet: string;
const myConst: number;
`;

describe("VariableDefinition", () => {
    const myFile = getInfoFromString(code);

    describe("write()", () => {
        describe("myImplicitAny", () => {
            it("should contain everything written out", () => {
                const expected = `var myImplicitAny: any;\n`;
                assert.equal(myFile.variables[0].write(), expected);
            });
        });

        describe("myExplicitTypeVar", () => {
            it("should contain everything written out", () => {
                const expected = `var myExplicitTypeVar: number;\n`;
                assert.equal(myFile.variables[1].write(), expected);
            });
        });

        describe("myImplicitTypeVar", () => {
            it("should write out the expression when specifying to", () => {
                const expected = `var myImplicitTypeVar = "my string";\n`;
                assert.equal(myFile.variables[2].write(), expected);
            });
        });

        describe("myLet", () => {
            it("should contain everything written out", () => {
                const expected = `let myLet: string;\n`;
                assert.equal(myFile.variables[3].write(), expected);
            });
        });

        describe("myConst", () => {
            it("should contain everything written out", () => {
                const expected = `const myConst: number;\n`;
                assert.equal(myFile.variables[4].write(), expected);
            });
        });
    });
});
