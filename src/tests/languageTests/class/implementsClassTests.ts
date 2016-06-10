import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("class implements class tests", () => {
    const code = `
class MyBaseClass {
    name1: string;
}

class MyClassImplementsClass implements MyBaseClass {
    name1: string;
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
            name: "MyClassImplementsClass",
            implementsTypes: [{ text: "MyBaseClass" }],
            properties: [{
                name: "name1",
                type: {
                    text: "string"
                }
            }, {
                name: "name2",
                type: {
                    text: "string"
                }
            }]
        }]
    });
});
