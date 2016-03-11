import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("class exports tests", () => {
    const code = `
export class MyExportedClass {
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyExportedClass",
            isExported: true,
            isNamedExportOfFile: true
        }],
        exports: [{
            name: "MyExportedClass"
        }]
    });
});
