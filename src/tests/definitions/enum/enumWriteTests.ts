import * as assert from "assert";
import {getInfoFromString} from "./../../../main";

const code = `
enum MyEnum {
    enumMember1 = 1,
    enumMember2
}
declare const enum MyDeclareConstEnum {
}
export const enum MyExportedConstEnum {
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
            assert.equal(file.enums[0].write(), expected);
        });

        it("should contain the declared const enum written out", () => {
            const expected =
`declare const enum MyDeclareConstEnum {
}
`;
            assert.equal(file.enums[1].write(), expected);
        });

        it("should contain the exported const enum written out", () => {
            const expected =
`export const enum MyExportedConstEnum {
}
`;
            assert.equal(file.enums[2].write(), expected);
        });
    });
});
