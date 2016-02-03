import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {VariableDefinition} from "./../../../definitions";
import {getStringInfo} from "./../../../main";
import {VariableWriter} from "./../../../writers";
import {WriteFlags} from "./../../../write-flags";
import {variableWriterTestCode} from "./../../writers/test-code";

function getWriterString(def: VariableDefinition, flags: WriteFlags) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new VariableWriter(codeBlockWriter);

    writer.write(def, flags);

    return codeBlockWriter.toString();
}

describe("VariableDefinition", () => {
    const file = getStringInfo(variableWriterTestCode);

    describe("write()", () => {
        file.variables.forEach(v => {
            it(`should write the same thing as a variable writer for the variable ${v.name}`, () => {
                assert.equal(v.write(), getWriterString(v, WriteFlags.Default));
            });
        });
    });
});
