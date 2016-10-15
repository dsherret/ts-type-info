import {getInfoFromString} from "./../../../main";
import {runNodedDefinitionTests} from "./../../testHelpers";

describe("object property noded tests", () => {
    const code = `function myFunc({ t = 4 }: { t: number; }) {}`;

    const def = getInfoFromString(code, {
        includeTsNodes: true
    });

    runNodedDefinitionTests(def.functions[0].parameters[0].destructuringProperties[0]);
    runNodedDefinitionTests(def.functions[0].parameters[0].type.properties[0]);
});
