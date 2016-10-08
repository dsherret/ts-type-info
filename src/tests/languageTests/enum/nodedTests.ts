import {getInfoFromString} from "./../../../main";
import {runNodedDefinitionTests} from "./../../testHelpers";

describe("enum noded tests", () => {
    const code = `
enum MyEnum {
}`;

    const def = getInfoFromString(code, {
        includeCompilerNodes: true
    });

    runNodedDefinitionTests(def.enums[0]);
});
