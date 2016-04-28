import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";
import {VariableDeclarationType} from "./../../../definitions";

describe("tuple type tests", () => {
    const code = `
let tuple: [number, string] = [5, "a string"];
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        variables: [{
            name: "tuple",
            declarationType: VariableDeclarationType.Let,
            typeExpression: {
                text: "[number, string]",
                types: [{
                    text: "[number, string]"
                }]
            },
            defaultExpression: { text: `[5, "a string"]` }
        }]
    });
});
