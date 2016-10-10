import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("function parameter destructuring", () => {
    const code = `
function parameterDestructuring({ prop1 = "s", prop2, prop3 }: { readonly prop1?: string; prop2?: number; prop3: Date; }) {
}

function implicitType({ prop1 = "s" }) {
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        functions: [{
            name: "parameterDestructuring",
            parameters: [{
                name: null,
                type: {
                    text: "{ readonly prop1?: string; prop2?: number; prop3: Date; }"
                },
                destructuringProperties: [{
                    name: "prop1",
                    type: { text: "string" },
                    defaultExpression: { text: `"s"` },
                    isOptional: true,
                    isReadonly: true
                }, {
                    name: "prop2",
                    type: { text: "number" },
                    isOptional: true
                }, {
                    name: "prop3",
                    type: { text: "Date" }
                }]
            }]
        }, {
            name: "implicitType",
            parameters: [{
                name: null,
                type: {
                    text: "{ prop1?: string; }"
                },
                destructuringProperties: [{
                    name: "prop1",
                    type: { text: "string" },
                    defaultExpression: { text: `"s"` },
                    isOptional: true
                }]
            }]
        }]
    });
});
