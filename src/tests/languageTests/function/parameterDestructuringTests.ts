import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("function parameter destructuring", () => {
    const code = `
function parameterDestructuring({ prop1 = "s", prop2, prop3 }: { prop1?: string; prop2?: number, prop3: Date; }) {
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        functions: [{
            name: "parameterDestructuring",
            parameters: [{
                name: null,
                typeExpression: {
                    text: "{ prop1?: string; prop2?: number; prop3: Date; }"
                },
                destructuringProperties: [{
                    name: "prop1",
                    typeExpression: { text: "string" },
                    defaultExpression: { text: `"s"` },
                    isOptional: true
                }, {
                    name: "prop2",
                    typeExpression: { text: "number" },
                    isOptional: true
                }, {
                    name: "prop3",
                    typeExpression: { text: "Date" }
                }]
            }]
        }]
    });
});
