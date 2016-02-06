import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {FunctionDefinition} from "./../../../definitions";
import {getStringInfo} from "./../../../main";
import {FunctionWriter} from "./../../../writers";
import {functionWriterTestCode} from "./../../writers/test-code";

function getWriterString(i: FunctionDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new FunctionWriter(codeBlockWriter);

    writer.write(i);

    return codeBlockWriter.toString();
}

describe("FunctionDefinition", () => {
    const file = getStringInfo(functionWriterTestCode);

    describe("write()", () => {
        file.functions.forEach(def => {
            it(`should write the same thing as a function writer for the function ${def.name}`, () => {
                assert.equal(def.write(), getWriterString(def));
            });
        });
    });

    describe("onWriteFunctionBody", () => {
        const funcDef = file.functions[0];

        funcDef.onWriteFunctionBody = (writer) => {
            writer.write(`return "text";`);
        };

        it(`should write the function with a body`, () => {
            const expected = `function myFunction(str: string) {\n    return "text";\n}\n`;
            assert.equal(funcDef.write(), expected);
        });
    });
});
