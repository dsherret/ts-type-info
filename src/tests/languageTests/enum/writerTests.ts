import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {EnumDefinition} from "./../../../definitions";
import {WriteFlags} from "./../../../WriteFlags";
import {getInfoFromString} from "./../../../main";
import {EnumWriter} from "./../../../writers";
import {enumWriterTestCode} from "./../../writers/testCode";

function getWriterString(e: EnumDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new EnumWriter(codeBlockWriter);

    writer.write(e, WriteFlags.Default);

    return codeBlockWriter.toString();
}

describe("EnumDefinition", () => {
    const file = getInfoFromString(enumWriterTestCode);

    describe("write()", () => {
        file.enums.forEach(e => {
            it(`should write the same thing as a enum writer for the enum ${e.name}`, () => {
                assert.equal(e.write(), getWriterString(e));
            });
        });
    });
});
