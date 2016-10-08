import {getInfoFromString} from "./../../../main";
import {runNodedDefinitionTests} from "./../../testHelpers";

describe("interface noded tests", () => {
    const code = `interface MyInterface {}`;

    const def = getInfoFromString(code, {
        includeCompilerNodes: true
    });

    runNodedDefinitionTests(def.interfaces[0]);
});
