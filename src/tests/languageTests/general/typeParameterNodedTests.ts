import {getInfoFromString} from "./../../../main";
import {runNodedDefinitionTests} from "./../../testHelpers";

describe("type parameter noded tests", () => {
    const code = `interface MyInterface<T> {}`;

    const def = getInfoFromString(code, {
        includeCompilerNodes: true
    });

    runNodedDefinitionTests(def.interfaces[0].typeParameters[0]);
});
