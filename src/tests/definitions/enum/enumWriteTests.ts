import * as assert from "assert";
import {getInfoFromString} from "./../../../main";

const code = `
enum MyEnum {
    enumMember1 = 1,
    enumMember2
}
const enum MyConstEnum {
}
`;

describe("EnumDefinition", () => {
    const file = getInfoFromString(code);

    describe("#write()", () => {
        it("should contain the enum written out", () => {
            const expected =
`enum MyEnum {
    enumMember1 = 1,
    enumMember2 = 2
}
`;
            assert.equal(file.getEnum("MyEnum").write(), expected);
        });

        it("should contain the const enum written out", () => {
            const expected =
`const enum MyConstEnum {
}
`;
            assert.equal(file.getEnum("MyConstEnum").write(), expected);
        });
    });
});
