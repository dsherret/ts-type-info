import {getStringInfo} from "./../../../main";
import {runFunctionDefinitionTests} from "./../../test-helpers";

describe("function name tests", () => {
    const code = `
function myFunction() {
}
function myFunctionWithParameters(str: string, num: number) {
    return new Date();
}`;

    const def = getStringInfo(code);

    runFunctionDefinitionTests(def.functions[0], {
        name: "myFunction",
        returnType: "void",
        parameters: []
    });

    runFunctionDefinitionTests(def.functions[1], {
        name: "myFunctionWithParameters",
        returnType: "Date",
        parameters: [{
            name: "str",
            type: "string"
        }, {
            name: "num",
            type: "number"
        }]
    });
});
