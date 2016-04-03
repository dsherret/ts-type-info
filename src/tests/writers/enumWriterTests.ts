import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {EnumWriter} from "./../../writers";
import {EnumDefinition} from "./../../definitions";
import {getInfoFromString} from "./../../main";
import {WriteFlags} from "./../../WriteFlags";
import {enumWriterTestCode} from "./testCode";

function getEnumAsString(enumMember: EnumDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new EnumWriter(codeBlockWriter);

    writer.write(enumMember, WriteFlags.Default);

    return codeBlockWriter.toString();
}

describe("EnumWriter", () => {
    const myEnum = getInfoFromString(enumWriterTestCode).enums[0];

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
