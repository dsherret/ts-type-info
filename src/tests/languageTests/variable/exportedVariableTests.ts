import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";
import {VariableDeclarationType, NamespaceDeclarationType} from "./../../../definitions";

describe("exported variable tests", () => {
    describe("in definition file", () => {
        const code = `
    declare module "definition-var" {
        export let myExplicitlyExportedVariable: string;
        let myImplicitlyExportedVariable: string;
    }
    `;

        const def = getInfoFromString(code);

        runFileDefinitionTests(def, {
            namespaces: [{
                name: `"definition-var"`,
                declarationType: NamespaceDeclarationType.Module,
                isAmbient: true,
                hasDeclareKeyword: true,
                variables: [{
                    declarationType: VariableDeclarationType.Let,
                    name: "myExplicitlyExportedVariable",
                    type: { text: "string" },
                    isExported: true,
                    isAmbient: true,
                    hasDeclareKeyword: false
                }, {
                    declarationType: VariableDeclarationType.Let,
                    name: "myImplicitlyExportedVariable",
                    type: { text: "string" },
                    isExported: true,
                    isAmbient: true,
                    hasDeclareKeyword: false
                }],
                exports: [{
                    name: "myExplicitlyExportedVariable"
                }, {
                    name: "myImplicitlyExportedVariable"
                }]
            }]
        });
    });
});
