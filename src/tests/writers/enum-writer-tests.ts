import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {EnumWriter} from "./../../writers";
import {EnumDefinition} from "./../../definitions";
import {getStringInfo} from "./../../main";

function getEnumAsString(enumMember: EnumDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new EnumWriter(codeBlockWriter);

    writer.write(enumMember);

    return codeBlockWriter.toString();
}

describe("EnumWriter", () => {
    const code = `
enum MyEnum {
    enumMember1 = 1,
    enumMember2
}
`;
    const myEnum = getStringInfo(code).enums[0];

    describe("write()", () => {
        it("should contain the enum member written out", () => {
            const expected =
`enum MyEnum {
    enumMember1 = 1,
    enumMember2 = 2
}
`;
            assert.equal(getEnumAsString(myEnum), expected);
        });
    });
});
