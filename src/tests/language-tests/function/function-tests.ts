import {getStringInfo} from "./../../../main";
import {runFunctionDefinitionTests} from "./../../test-helpers";

describe("function name tests", () => {
    const code = `
function myFunction() {
}
function myFunctionWithParameters(str: string, num: number, optionalParam?: string, defaultParam = new Date(), ...restParam: string[]) {
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
        }, {
            name: "optionalParam",
            type: "string",
            isOptional: true
        }, {
            name: "defaultParam",
            type: "Date",
            isOptional: true,
            defaultExpressionText: "new Date()"
        }, {
            name: "restParam",
            type: "string[]",
            isRestParameter: true,
            isOptional: true
        }]
    });
});
