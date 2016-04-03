import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {NamespaceDefinition} from "./../../../definitions";
import {getInfoFromString} from "./../../../main";
import {NamespaceWriter, ModuledWriter} from "./../../../writers";
import {WriteFlags} from "./../../../WriteFlags";
import {namespaceWriterTestCode} from "./../../writers/testCode";

function getWriterString(i: NamespaceDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new NamespaceWriter(codeBlockWriter, new ModuledWriter(codeBlockWriter));

    writer.write(i, WriteFlags.Default);

    return codeBlockWriter.toString();
}

describe("NamespaceDefinition", () => {
    const file = getInfoFromString(namespaceWriterTestCode);

    describe("write()", () => {
        file.namespaces.forEach(i => {
            it(`should write the same thing as a namespace writer for the namespace ${i.name}`, () => {
                assert.equal(i.write(), getWriterString(i));
            });
        });
    });
});
