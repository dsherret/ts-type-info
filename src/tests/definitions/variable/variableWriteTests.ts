import * as assert from "assert";
import {getInfoFromString} from "./../../../main";

const code = `
/**
 * Some description
 */
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
                const expected = `/**\n * Some description\n */\nvar myImplicitAny: any;`;
                assert.equal(myFile.variables[0].write(), expected);
            });
        });

        describe("myExplicitTypeVar", () => {
            it("should contain everything written out", () => {
                const expected = `var myExplicitTypeVar: number;`;
                assert.equal(myFile.variables[1].write(), expected);
            });
        });

        describe("myImplicitTypeVar", () => {
            it("should write out the expression without the type when a default expression exists", () => {
                const expected = `var myImplicitTypeVar = "my string";`;
                assert.equal(myFile.variables[2].write(), expected);
            });
        });

        describe("myLet", () => {
            it("should contain everything written out", () => {
                const expected = `let myLet: string;`;
                assert.equal(myFile.variables[3].write(), expected);
            });
        });

        describe("myConst", () => {
            it("should contain everything written out", () => {
                const expected = `const myConst: number;`;
                assert.equal(myFile.variables[4].write(), expected);
            });
        });
    });
});
