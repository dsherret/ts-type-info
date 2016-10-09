import {getInfoFromString} from "./../../../main";
import {runNodedDefinitionTests, runNodedDefinitionTestsForNonNamed} from "./../../testHelpers";

describe("interface noded tests", () => {
    const code = `
interface MyInterface {
    new(param: string): string;
    myMethod(param: string): string;
    myMethod(param: any): string;
    prop: string;
}
`;

    const def = getInfoFromString(code, {
        includeCompilerNodes: true
    });

    runNodedDefinitionTests(def.interfaces[0]);
    runNodedDefinitionTestsForNonNamed(def.interfaces[0].newSignatures[0]);
    runNodedDefinitionTests(def.interfaces[0].newSignatures[0].parameters[0]);
    runNodedDefinitionTests(def.interfaces[0].methods[0]);
    runNodedDefinitionTests(def.interfaces[0].methods[0].parameters[0]);
    runNodedDefinitionTestsForNonNamed(def.interfaces[0].methods[0].overloadSignatures[0]);
    runNodedDefinitionTests(def.interfaces[0].methods[0].overloadSignatures[0].parameters[0]);
    runNodedDefinitionTests(def.interfaces[0].properties[0]);
});
