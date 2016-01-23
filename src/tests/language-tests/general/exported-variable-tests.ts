import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";
import {VariableDeclarationType, NamespaceDeclarationType} from "./../../../definitions";

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
            declarationType: NamespaceDeclarationType.Module,
            isAmbient: true,
            variables: [{
                declarationType: VariableDeclarationType.Let,
                name: "myVariable",
                typeExpression: { text: "string[]" },
                isExported: true
            }]
        }]
    });
});
