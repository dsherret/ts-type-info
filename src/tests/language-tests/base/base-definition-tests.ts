import * as assert from "assert";
import {getStringInfo} from "./../../../main";
import {functionWriterTestCode} from "./../../writers/test-code";

describe("BaseDefinition", () => {
    const file = getStringInfo(functionWriterTestCode);
    const funcDef = file.functions[0];

    describe("onBeforeWrite", () => {
        it(`should write the function with the before text`, () => {
            funcDef.onBeforeWrite = (writer) => {
                writer.write(`@MyEnumerable`);
            };
            funcDef.onAfterWrite = null;

            const expected = `@MyEnumerable\nfunction myFunction(str: string) {\n}\n`;
            assert.equal(funcDef.write(), expected);
        });
    });

    describe("onAfterWrite", () => {
        it(`should write the function with the after text`, () => {
            funcDef.onBeforeWrite = null;
            funcDef.onAfterWrite = (writer) => {
                writer.write(`// something`);
            };

            const expected = `function myFunction(str: string) {\n}\n// something\n`;
            assert.equal(funcDef.write(), expected);
        });
    });
});
