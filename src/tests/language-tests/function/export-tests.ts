import {getStringInfo} from "./../../../main";
import {runFunctionDefinitionTests} from "./../../test-helpers";

describe("function export tests", () => {
    const code = `
function myFunction() {
}
export function myExportedFunction() {
}`;

    const def = getStringInfo(code);

    runFunctionDefinitionTests(def.functions[0], {
        name: "myFunction",
        returnType: "void",
        parameters: []
    });

    runFunctionDefinitionTests(def.functions[1], {
        name: "myExportedFunction",
        returnType: "void",
        parameters: [],
        isExported: true
    });
});
