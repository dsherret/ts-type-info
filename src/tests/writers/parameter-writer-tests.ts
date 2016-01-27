import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {ParameterWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";
import {BaseParameterDefinition} from "./../../definitions";
import {getStringInfo} from "./../../main";

function getParametersAsString(params: BaseParameterDefinition[], flags: WriteFlags) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new ParameterWriter(codeBlockWriter);

    writer.write(params, flags);

    return codeBlockWriter.toString();
}

describe("ParameterWriter", () => {
    const code = `
function myFunction(param1: string, param2 = "text", param3?: number, ...params: string[]) {
}
`;
    const myFunction = getStringInfo(code).functions[0];

    describe("write()", () => {
        it("should contain the parameters written out without the default expressions", () => {
            assert.equal(
                getParametersAsString(myFunction.parameters, WriteFlags.None),
                `(param1: string, param2?: string, param3?: number, ...params: string[])`
            );
        });

        it("should contain the parameters written out with the default expressions", () => {
            assert.equal(
                getParametersAsString(myFunction.parameters, WriteFlags.ParameterDefaultExpressions),
                `(param1: string, param2?: string = "text", param3?: number, ...params: string[])`
            );
        });
    });
});
