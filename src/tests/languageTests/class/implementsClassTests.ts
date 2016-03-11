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
                typeExpression: {
                    text: "string"
                }
            }]
        }, {
            name: "MyClassImplementsClass",
            implementsTypeExpressions: [{ text: "MyBaseClass" }],
            properties: [{
                name: "name1",
                typeExpression: {
                    text: "string"
                }
            }, {
                name: "name2",
                typeExpression: {
                    text: "string"
                }
            }]
        }]
    });
});
