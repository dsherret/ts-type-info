import * as assert from "assert";
import {getInfoFromString} from "./../../../main";

const code = `
/**
 * Some description
 */
type myTypeAlias = string | number;
type myTypeParameteredTypeAlias<T> = T[];
type myStringLiteralTypeAlias = "some string" | "other string";
`;

describe("TypeAliasDefinition", () => {
    const myFile = getInfoFromString(code);

    describe("#write()", () => {
        describe("myTypeAlias", () => {
            it("should contain everything written out", () => {
                const expected = `/**\n * Some description\n */\ntype myTypeAlias = string | number;\n`;
                assert.equal(myFile.typeAliases[0].write(), expected);
            });
        });

        describe("myTypeParameteredTypeAlias", () => {
            it("should contain everything written out", () => {
                const expected = `type myTypeParameteredTypeAlias<T> = T[];\n`;
                assert.equal(myFile.typeAliases[1].write(), expected);
            });
        });

        describe("myStringLiteralTypeAlias", () => {
            it("should contain everything written out", () => {
                const expected = `type myStringLiteralTypeAlias = "some string" | "other string";\n`;
                assert.equal(myFile.typeAliases[2].write(), expected);
            });
        });
    });
});
