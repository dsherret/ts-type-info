import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("class extends tests", () => {
    const code = `
class MyBaseClass {
    name1: string;
}

class MyChildClass extends MyBaseClass {
    name2: string;
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyBaseClass",
            properties: [{
                name: "name1",
                type: {
                    text: "string"
                }
            }]
        }, {
            name: "MyChildClass",
            extendsTypes: [{ text: "MyBaseClass" }],
            properties: [{
                name: "name2",
                type: {
                    text: "string"
                }
            }]
        }]
    });
});
