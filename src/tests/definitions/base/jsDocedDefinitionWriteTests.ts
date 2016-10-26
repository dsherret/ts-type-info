import * as assert from "assert";
import {getInfoFromString} from "./../../../main";

const code = `enum MyEnum {}`;

describe("JsDocedDefinition write tests", () => {
    const file = getInfoFromString(code);

    describe("#write()", () => {
        it("should contain the definition written out with jsdoc when providing a properly formatted jsdoc", () => {
            const expected =
`/**
 * Some description
 */
enum MyEnum {
}
`;
            file.enums[0].jsDocText = "/**\n * Some description\n */";
            assert.equal(file.enums[0].write(), expected);
        });

        it("should contain the definition written out with jsdoc when not providing a properly formatted jsdoc", () => {
            const expected =
`/**
 * Some description
 * Over multiple lines
 * And more lines
 */
enum MyEnum {
}
`;
            file.enums[0].jsDocText = "Some description\nOver multiple lines\r\nAnd more lines";
            assert.equal(file.enums[0].write(), expected);
        });
    });
});
