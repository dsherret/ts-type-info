import {getInfoFromString} from "./../../../main";
import {runNodedDefinitionTestsForNonNamed} from "./../../testHelpers";

describe("file noded tests", () => {
    const code = ``;

    const def = getInfoFromString(code, {
        includeCompilerNodes: true
    });

    runNodedDefinitionTestsForNonNamed(def);
});
