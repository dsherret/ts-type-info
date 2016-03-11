import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {EnumMemberWriter} from "./../../writers";
import {EnumMemberDefinition} from "./../../definitions";
import {getStringInfo} from "./../../main";
import {WriteFlags} from "./../../WriteFlags";

function getEnumMemberAsString(enumMember: EnumMemberDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new EnumMemberWriter(codeBlockWriter, WriteFlags.Default);

    writer.write(enumMember);

    return codeBlockWriter.toString();
}

describe("EnumMemberWriter", () => {
    const code = `
enum MyEnum {
    enumMember = 1
}
`;
    const myEnum = getStringInfo(code).enums[0];

    describe("write()", () => {
        it("should contain the enum member written out", () => {
            assert.equal(getEnumMemberAsString(myEnum.members[0]), `enumMember = 1`);
        });
    });
});
