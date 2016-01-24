import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";
import {VariableDeclarationType, NamespaceDeclarationType} from "./../../../definitions";

describe("variable tests", () => {
    const code = `
declare module "definition-var" {
    export let myExplictlyExportedVariable: string[];
    let myImplicitlyExportedVariable: string;
}
`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        namespaces: [{
            name: `"definition-var"`,
            declarationType: NamespaceDeclarationType.Module,
            isAmbient: true,
            hasDeclareKeyword: true,
            variables: [{
                declarationType: VariableDeclarationType.Let,
                name: "myExplictlyExportedVariable",
                typeExpression: { text: "string[]" },
                isExported: true,
                hasExportKeyword: true,
                isAmbient: true,
                hasDeclareKeyword: false
            }, {
                declarationType: VariableDeclarationType.Let,
                name: "myImplicitlyExportedVariable",
                typeExpression: { text: "string" },
                isExported: true,
                hasExportKeyword: false,
                isAmbient: true,
                hasDeclareKeyword: false
            }]
        }]
    });
});
