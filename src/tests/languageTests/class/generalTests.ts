import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("class general tests", () => {
    const code = `
/**
 * Some description
 */
class MyClass {
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyClass",
            jsDocText: "/**\n * Some description\n */"
        }]
    });
});
