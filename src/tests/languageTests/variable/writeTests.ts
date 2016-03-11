import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {VariableDefinition} from "./../../../definitions";
import {getStringInfo} from "./../../../main";
import {VariableWriter} from "./../../../writers";
import {variableWriterTestCode} from "./../../writers/testCode";

function getWriterString(def: VariableDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new VariableWriter(codeBlockWriter);

    writer.write(def);

    return codeBlockWriter.toString();
}

describe("VariableDefinition", () => {
    const file = getStringInfo(variableWriterTestCode);

    describe("write()", () => {
        file.variables.forEach(v => {
            it(`should write the same thing as a variable writer for the variable ${v.name}`, () => {
                assert.equal(v.write(), getWriterString(v));
            });
        });
    });
});
