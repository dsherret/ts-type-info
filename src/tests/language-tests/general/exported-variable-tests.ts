import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("variable tests", () => {
    const code = `
declare module "definition-var" {
    export let myVariable: string[];
}
`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        namespaces: [{
            name: `"definition-var"`,
            variables: [{
                declarationType: "let",
                name: "myVariable",
                typeExpression: { text: "string[]" },
                isExported: true
            }]
        }]
    });
});
