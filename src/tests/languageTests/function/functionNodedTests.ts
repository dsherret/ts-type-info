import {getInfoFromString} from "./../../../main";
import {runNodedDefinitionTests, runNodedDefinitionTestsForNonNamed} from "./../../testHelpers";

describe("function noded tests", () => {
    const code = `
function myFunction(param: string): void;
function myFunction(param: any) { }`;

    const def = getInfoFromString(code, {
        includeCompilerNodes: true
    });

    runNodedDefinitionTests(def.functions[0]);
    runNodedDefinitionTests(def.functions[0].parameters[0]);
    runNodedDefinitionTestsForNonNamed(def.functions[0].overloadSignatures[0]);
    runNodedDefinitionTests(def.functions[0].overloadSignatures[0].parameters[0]);
});
