import {getInfoFromString} from "./../../../main";
import {runNodedDefinitionTests} from "./../../testHelpers";

describe("variable noded tests", () => {
    const code = `var myVar: any;`;

    const def = getInfoFromString(code, {
        includeTsNodes: true
    });

    runNodedDefinitionTests(def.variables[0]);
});
