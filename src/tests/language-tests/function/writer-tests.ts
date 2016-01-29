import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {FunctionDefinition} from "./../../../definitions";
import {getStringInfo} from "./../../../main";
import {FunctionWriter} from "./../../../writers";
import {WriteFlags} from "./../../../write-flags";
import {functionWriterTestCode} from "./../../writers/test-code";

function getWriterString(i: FunctionDefinition, flags: WriteFlags) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new FunctionWriter(codeBlockWriter);

    writer.write(i, flags);

    return codeBlockWriter.toString();
}

describe("FunctionDefinition", () => {
    const file = getStringInfo(functionWriterTestCode);

    describe("write()", () => {
        file.functions.forEach(i => {
            it(`should write the same thing as a function writer for the function ${i.name}`, () => {
                assert.equal(i.write(), getWriterString(i, WriteFlags.Default));
            });
        });
    });
});
