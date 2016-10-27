import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("interface general tests", () => {
    const code = `
/**
 * Some description
 */
interface MyInterface {
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        interfaces: [{
            name: "MyInterface",
            documentationComment: "/**\n * Some description\n */"
        }]
    });
});
