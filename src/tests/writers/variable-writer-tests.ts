import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {VariableDefinition} from "./../../definitions";
import {getStringInfo} from "./../../main";
import {VariableWriter} from "./../../writers";
import {variableWriterTestCode} from "./test-code";
import {WriteFlags} from "./../../write-flags";

function getVariableAsString(def: VariableDefinition, flags = WriteFlags.Expressions) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new VariableWriter(codeBlockWriter);

    writer.write(def, flags);

    return codeBlockWriter.toString();
}

describe("VariableWriter", () => {
    const myFile = getStringInfo(variableWriterTestCode);

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
                assert.equal(getVariableAsString(myFile.variables[2], WriteFlags.Expressions), expected);
            });

            it("should not write out the expression when not specifying to", () => {
                const expected = `var myImplicitTypeVar: string;\n`;
                assert.equal(getVariableAsString(myFile.variables[2], WriteFlags.None), expected);
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
