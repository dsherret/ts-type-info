import {getInfoFromString} from "./../../../main";
import {runNodedDefinitionTests} from "./../../testHelpers";

describe("enum noded tests", () => {
    const code = `
enum MyEnum {
    Member
}`;

    const def = getInfoFromString(code, {
        includeTsNodes: true
    });

    runNodedDefinitionTests(def.enums[0]);
    runNodedDefinitionTests(def.enums[0].members[0]);
});
