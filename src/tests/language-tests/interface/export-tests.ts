import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("interface exports tests", () => {
    const code = `
export interface MyExportedInterface {
}`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        interfaces: [{
            name: "MyExportedInterface",
            isExported: true,
            hasExportKeyword: true
        }],
        exports: [{
            name: "MyExportedInterface"
        }]

    });
});
