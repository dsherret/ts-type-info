import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {EnumDefinition} from "./../../../definitions";
import {getStringInfo} from "./../../../main";
import {EnumWriter} from "./../../../writers";

function getWriterString(e: EnumDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new EnumWriter(codeBlockWriter);

    writer.write(e);

    return codeBlockWriter.toString();
}

describe("EnumDefinition", () => {
    const code = `
enum MyEnum {
    enumMember1 = 1,
    enumMember2
}
`;
    const file = getStringInfo(code);

    describe("write()", () => {
        file.enums.forEach(e => {
            it(`should write the same thing as a enum writer for the enum ${e.name}`, () => {
                assert.equal(e.write(), getWriterString(e));
            });
        });
    });
});
