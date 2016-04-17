import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {ParametersWriter} from "./../../writers";
import {ParameterDefinitions} from "./../../definitions";
import {getInfoFromString} from "./../../main";
import {WriteFlags} from "./../../WriteFlags";

function getParametersAsString(params: ParameterDefinitions[]) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new ParametersWriter(codeBlockWriter);

    writer.write(params, WriteFlags.Default);

    return codeBlockWriter.toString();
}

describe("ParametersWriter", () => {
    const code = `
function myFunction(param1: string, param2 = "text", param3?: number, ...params: string[]) {
}
`;
    const myFunction = getInfoFromString(code).functions[0];

    describe("write()", () => {
        it("should contain the parameters written out", () => {
            const expected = `(param1: string, param2 = "text", param3?: number, ...params: string[])`;
            assert.equal(getParametersAsString(myFunction.parameters), expected);
        });
    });
});
