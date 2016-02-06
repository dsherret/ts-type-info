import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {InterfaceDefinition} from "./../../../definitions";
import {getStringInfo} from "./../../../main";
import {InterfaceWriter} from "./../../../writers";
import {interfaceWriterTestCode} from "./../../writers/test-code";

function getWriterString(i: InterfaceDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new InterfaceWriter(codeBlockWriter);

    writer.write(i);

    return codeBlockWriter.toString();
}

describe("InterfaceDefinition", () => {
    const file = getStringInfo(interfaceWriterTestCode);

    describe("write()", () => {
        file.interfaces.forEach(i => {
            it(`should write the same thing as a interface writer for the interface ${i.name}`, () => {
                assert.equal(i.write(), getWriterString(i));
            });
        });
    });
});
