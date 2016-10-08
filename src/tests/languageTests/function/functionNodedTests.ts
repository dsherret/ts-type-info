import {getInfoFromString} from "./../../../main";
import {runNodedDefinitionTests} from "./../../testHelpers";

describe("function noded tests", () => {
    const code = `
function myFunction(param: string) { }`;

    const def = getInfoFromString(code, {
        includeCompilerNodes: true
    });

    runNodedDefinitionTests(def.functions[0]);
    runNodedDefinitionTests(def.functions[0].parameters[0]);
});
