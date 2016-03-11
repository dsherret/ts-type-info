import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("function export tests", () => {
    const code = `
function myFunction() {
}
export function myExportedFunction() {
}`;

    const def = getInfoFromString(code);

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
