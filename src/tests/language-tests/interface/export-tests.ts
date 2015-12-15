import {getStringInfo} from "./../../../main";
import {runExportableDefinitionTests} from "./../../test-helpers";

describe("interface exports tests", () => {
    const code = `
interface MyInterface {
}
export interface MyExportedInterface {
}`;

    const def = getStringInfo(code);

    runExportableDefinitionTests(def.interfaces[0], false);
    runExportableDefinitionTests(def.interfaces[1], true);
});
