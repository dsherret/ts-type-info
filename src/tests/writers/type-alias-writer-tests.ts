import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {TypeAliasDefinition} from "./../../definitions";
import {getStringInfo} from "./../../main";
import {TypeAliasWriter} from "./../../writers";
import {typeAliasWriterTestCode} from "./test-code";

function getTypeAliasAsString(def: TypeAliasDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new TypeAliasWriter(codeBlockWriter);

    writer.write(def);

    return codeBlockWriter.toString();
}

describe("NamespaceWriter", () => {
    const myFile = getStringInfo(typeAliasWriterTestCode);

    describe("write()", () => {
        describe("myTypeAlias", () => {
            it("should contain everything written out", () => {
                const expected = `type myTypeAlias = string | number;\n`;
                assert.equal(getTypeAliasAsString(myFile.typeAliases[0]), expected);
            });
        });

        describe("myTypeParameteredTypeAlias", () => {
            it("should contain everything written out", () => {
                const expected = `type myTypeParameteredTypeAlias<T> = T[];\n`;
                assert.equal(getTypeAliasAsString(myFile.typeAliases[1]), expected);
            });
        });
    });
});
