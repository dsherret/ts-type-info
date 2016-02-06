import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {FileDefinition} from "./../../../definitions";
import {getStringInfo} from "./../../../main";
import {FileWriter} from "./../../../writers";
import {fileWriterTestCode} from "./../../writers/test-code";

function getWriterString(f: FileDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new FileWriter(codeBlockWriter);

    writer.write(f);

    return codeBlockWriter.toString();
}

describe("FileDefinition", () => {
    const file = getStringInfo(fileWriterTestCode);

    describe("write()", () => {
        it(`should write the same thing as a file writer for the file`, () => {
            assert.equal(file.write(), getWriterString(file));
        });
    });
});
