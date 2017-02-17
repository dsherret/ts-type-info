import * as assert from "assert";
import {getInfoFromString} from "./../../../main";

const code = `
function myFunction() {
}
`;

describe("BaseDefinition", () => {
    const file = getInfoFromString(code);
    const funcDef = file.functions[0];

    describe("onBeforeWrite", () => {
        it(`should write the function with the before text`, () => {
            funcDef.onBeforeWrite = (writer) => {
                writer.write(`@MyEnumerable\n`);
            };
            funcDef.onAfterWrite = null;

            const expected = `@MyEnumerable\nfunction myFunction() {\n}\n`;
            assert.equal(funcDef.write(), expected);
        });
    });

    describe("onAfterWrite", () => {
        it(`should write the function with the after text`, () => {
            funcDef.onBeforeWrite = null;
            funcDef.onAfterWrite = (writer) => {
                writer.write(`// something`);
            };

            const expected = `function myFunction() {\n}\n// something`;
            assert.equal(funcDef.write(), expected);
        });
    });
});
