import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("interface extends class tests", () => {
    const code = `
class MyBaseClass {
    name: string;
}

interface MyChildInterface extends MyBaseClass {
    name2: string;
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyBaseClass",
            properties: [{
                name: "name",
                type: { text: "string" }
            }]
        }],
        interfaces: [{
            name: "MyChildInterface",
            extendsTypes: [{
                text: "MyBaseClass"
            }],
            properties: [{
                name: "name2",
                type: { text: "string" }
            }]
        }]
    });
});
