import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("class extends tests", () => {
    const code = `
class MyBaseClass {
    name1: string;
}

class MyChildClass extends MyBaseClass {
    name2: string;
}
`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyBaseClass",
            properties: [{
                name: "name1",
                typeExpression: {
                    text: "string"
                }
            }]
        }, {
            name: "MyChildClass",
            extends: [{ text: "MyBaseClass" }],
            properties: [{
                name: "name2",
                typeExpression: {
                    text: "string"
                }
            }]
        }]
    });
});
