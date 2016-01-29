import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {FunctionDefinition} from "./../../definitions";
import {getStringInfo} from "./../../main";
import {FunctionWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";
import {functionWriterTestCode} from "./test-code";

function getFunctionAsString(i: FunctionDefinition, flags: WriteFlags) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new FunctionWriter(codeBlockWriter);

    writer.write(i, flags);

    return codeBlockWriter.toString();
}

describe("FunctionWriter", () => {
    const file = getStringInfo(functionWriterTestCode);

    describe("write()", () => {
        describe("myFunction", () => {
            it("should contain the function written out", () => {
                const expected = `function myFunction(str: string): string {\n}\n`;
                assert.equal(getFunctionAsString(file.functions[0], WriteFlags.None), expected);
            });
        });

        describe("myFunction2", () => {
            it("should contain the function written out", () => {
                const expected = `function myFunction2<T extends string, U>(str: T, num: U): void {\n}\n`;
                assert.equal(getFunctionAsString(file.functions[1], WriteFlags.None), expected);
            });
        });
    });
});
