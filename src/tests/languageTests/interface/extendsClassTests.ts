import {getStringInfo} from "./../../../main";
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

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyBaseClass",
            properties: [{
                name: "name",
                typeExpression: { text: "string" }
            }]
        }],
        interfaces: [{
            name: "MyChildInterface",
            extendsTypeExpressions: [{
                text: "MyBaseClass"
            }],
            properties: [{
                name: "name2",
                typeExpression: { text: "string" }
            }]
        }]
    });
});
