import {getStringInfo} from "./../../../main";
import {runExportableDefinitionTests} from "./../../test-helpers";

describe("class exports tests", () => {
    const code = `
class MyClass {
}
export class MyExportedClass {
}`;

    const def = getStringInfo(code);

    runExportableDefinitionTests(def.classes[0], false);
    runExportableDefinitionTests(def.classes[1], true);
});
