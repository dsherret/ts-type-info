import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("class exports tests", () => {
    const code = `
export class MyExportedClass {
}`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyExportedClass",
            isExported: true
        }]
    });
});
