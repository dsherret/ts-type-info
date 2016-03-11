/*import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";
import {VariableDeclarationType} from "./../../../definitions";

describe("function type tests", () => {
    const code = `
var tuple: [number, string] = [5, "a string"];
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        variables: [{
            name: "tuple",
            declarationType: VariableDeclarationType.Var,
            typeExpression: {
                text: "[number, string]",
                types: [{
                    text: "[number, string]",
                }]
            }
        }]
    });
});
*/
