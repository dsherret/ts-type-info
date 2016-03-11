import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {TypeAliasDefinition} from "./../../../definitions";
import {getStringInfo} from "./../../../main";
import {TypeAliasWriter} from "./../../../writers";
import {typeAliasWriterTestCode} from "./../../writers/testCode";

function getWriterString(i: TypeAliasDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new TypeAliasWriter(codeBlockWriter);

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
