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
                type: {
                    text: "{ prop1?: string; prop2?: number; prop3: Date; }"
                },
                destructuringProperties: [{
                    name: "prop1",
                    type: { text: "string" },
                    defaultExpression: { text: `"s"` },
                    isOptional: true
                }, {
                    name: "prop2",
                    type: { text: "number" },
                    isOptional: true
                }, {
                    name: "prop3",
                    type: { text: "Date" }
                }]
            }]
        }]
    });
});
