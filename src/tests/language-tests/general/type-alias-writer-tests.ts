import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {TypeAliasDefinition} from "./../../../definitions";
import {WriteFlags} from "./../../../write-flags";
import {getStringInfo} from "./../../../main";
import {TypeAliasWriter} from "./../../../writers";
import {typeAliasWriterTestCode} from "./../../writers/test-code";

function getWriterString(i: TypeAliasDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new TypeAliasWriter(codeBlockWriter, WriteFlags.Default);

    writer.write(i);

    return codeBlockWriter.toString();
}

describe("TypeAliasDefinition", () => {
    const file = getStringInfo(typeAliasWriterTestCode);

    describe("write()", () => {
        file.typeAliases.forEach(typeAlias => {
            it(`should write the same thing as a typealias writer for the typealias ${typeAlias.name}`, () => {
                assert.equal(typeAlias.write(), getWriterString(typeAlias));
            });
        });
    });
});
