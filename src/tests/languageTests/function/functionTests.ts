import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("function name tests", () => {
    const code = `
function myFunction() {
}
function myFunctionWithParameters(str: string, optionalParam?: string, defaultParam = new Date(), ...restParam: string[]) {
    return new Date();
}`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        functions: [{
            name: "myFunction"
        }, {
            name: "myFunctionWithParameters",
            parameters: [{
                name: "str",
                typeExpression: { text: "string" }
            }, {
                name: "optionalParam",
                typeExpression: { text: "string" },
                isOptional: true
            }, {
                name: "defaultParam",
                typeExpression: { text: "Date" },
                defaultExpression: { text: "new Date()" },
                isOptional: true
            }, {
                name: "restParam",
                typeExpression: { text: "string[]" },
                isOptional: true,
                isRestParameter: true
            }],
            returnTypeExpression: {
                text: "Date"
            }
        }]
    });
});
