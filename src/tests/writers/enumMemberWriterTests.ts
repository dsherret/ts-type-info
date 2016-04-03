import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {EnumMemberWriter} from "./../../writers";
import {EnumMemberDefinition} from "./../../definitions";
import {getInfoFromString} from "./../../main";
import {WriteFlags} from "./../../WriteFlags";

function getEnumMemberAsString(enumMember: EnumMemberDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new EnumMemberWriter(codeBlockWriter);

    writer.write(enumMember, WriteFlags.Default);

    return codeBlockWriter.toString();
}

describe("EnumMemberWriter", () => {
    const code = `
enum MyEnum {
    enumMember = 1
}
`;
    const myEnum = getInfoFromString(code).enums[0];

    describe("write()", () => {
        it("should contain the enum member written out", () => {
            assert.equal(getEnumMemberAsString(myEnum.members[0]), `enumMember = 1`);
        });
    });
});
