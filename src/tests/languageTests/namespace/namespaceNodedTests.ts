import {getInfoFromString} from "./../../../main";
import {runNodedDefinitionTests} from "./../../testHelpers";

describe("namespace noded tests", () => {
    const code = `namespace MyNamespace{}`;

    const def = getInfoFromString(code, {
        includeTsNodes: true
    });

    runNodedDefinitionTests(def.namespaces[0]);
});
