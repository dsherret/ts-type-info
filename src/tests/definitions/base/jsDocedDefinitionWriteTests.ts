import * as assert from "assert";
import {getInfoFromString} from "./../../../main";

const code = `enum MyEnum {}`;

describe("DocumentationedDefinition write tests", () => {
    const file = getInfoFromString(code);

    describe("#write()", () => {
        it("should contain the definition written out with documentation comment when providing a properly formatted one", () => {
            const expected =
`/**
 * Some description
 */
enum MyEnum {
}
`;
            file.enums[0].documentationComment = "/**\n * Some description\n */";
            assert.equal(file.enums[0].write(), expected);
        });

        it("should contain the definition written out with documentation comment when not providing a properly formatted one", () => {
            const expected =
`/**
 * Some description
 * Over multiple lines
 * And more lines
 */
enum MyEnum {
}
`;
            file.enums[0].documentationComment = "Some description\nOver multiple lines\r\nAnd more lines";
            assert.equal(file.enums[0].write(), expected);
        });
    });
});
