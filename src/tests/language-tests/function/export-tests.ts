import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("function export tests", () => {
    const code = `
function myFunction() {
}
export function myExportedFunction() {
}`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        functions: [{
            name: "myFunction"
        }, {
            name: "myExportedFunction",
            isExported: true,
            isNamedExportOfFile: true
        }],
        exports: [{
            name: "myExportedFunction"
        }]

    });
});
