import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {EnumWriter} from "./../../writers";
import {EnumDefinition} from "./../../definitions";
import {getStringInfo} from "./../../main";
import {WriteFlags} from "./../../writeFlags";
import {enumWriterTestCode} from "./TestCode";

function getEnumAsString(enumMember: EnumDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new EnumWriter(codeBlockWriter, WriteFlags.Default);

    writer.write(enumMember);

    return codeBlockWriter.toString();
}

describe("EnumWriter", () => {
    const myEnum = getStringInfo(enumWriterTestCode).enums[0];

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
