import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {NamespaceDefinition} from "./../../../definitions";
import {getStringInfo} from "./../../../main";
import {NamespaceWriter, ModuledWriter} from "./../../../writers";
import {WriteFlags} from "./../../../write-flags";
import {namespaceWriterTestCode} from "./../../writers/test-code";

function getWriterString(i: NamespaceDefinition, flags: WriteFlags) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new NamespaceWriter(codeBlockWriter, new ModuledWriter(codeBlockWriter));

    writer.write(i, flags);

    return codeBlockWriter.toString();
}

describe("NamespaceDefinition", () => {
    const file = getStringInfo(namespaceWriterTestCode);

    describe("write()", () => {
        file.namespaces.forEach(i => {
            it(`should write the same thing as a namespace writer for the namespace ${i.name}`, () => {
                assert.equal(i.write(), getWriterString(i, WriteFlags.Default));
            });
        });
    });
});
