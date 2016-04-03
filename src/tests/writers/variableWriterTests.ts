import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {VariableDefinition} from "./../../definitions";
import {getInfoFromString} from "./../../main";
import {VariableWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {variableWriterTestCode} from "./testCode";

function getVariableAsString(def: VariableDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new VariableWriter(codeBlockWriter);

    writer.write(def, WriteFlags.Default);

    return codeBlockWriter.toString();
}

describe("VariableWriter", () => {
    const myFile = getInfoFromString(variableWriterTestCode);

    describe("write()", () => {
        describe("myImplicitAny", () => {
            it("should contain everything written out", () => {
                const expected = `var myImplicitAny: any;\n`;
                assert.equal(getVariableAsString(myFile.variables[0]), expected);
            });
        });

        describe("myExplicitTypeVar", () => {
            it("should contain everything written out", () => {
                const expected = `var myExplicitTypeVar: number;\n`;
                assert.equal(getVariableAsString(myFile.variables[1]), expected);
            });
        });

        describe("myImplicitTypeVar", () => {
            it("should write out the expression when specifying to", () => {
                const expected = `var myImplicitTypeVar: string = "my string";\n`;
                assert.equal(getVariableAsString(myFile.variables[2]), expected);
            });
        });

        describe("myLet", () => {
            it("should contain everything written out", () => {
                const expected = `let myLet: string;\n`;
                assert.equal(getVariableAsString(myFile.variables[3]), expected);
            });
        });

        describe("myConst", () => {
            it("should contain everything written out", () => {
                const expected = `const myConst: number;\n`;
                assert.equal(getVariableAsString(myFile.variables[4]), expected);
            });
        });
    });
});
