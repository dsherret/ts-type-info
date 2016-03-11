import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("class extends implements tests", () => {
    const code = `
interface MyInterface {
    name: string;
}

class MyBaseClass {
    prop: string;
}

class MyExtendsImplementsClass extends MyBaseClass implements MyInterface {
    name: string;
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        interfaces: [{
            name: "MyInterface",
            properties: [{
                name: "name",
                typeExpression: {
                    text: "string"
                }
            }]
        }],
        classes: [{
            name: "MyBaseClass",
            properties: [{
                name: "prop",
                typeExpression: {
                    text: "string"
                }
            }]
        }, {
            name: "MyExtendsImplementsClass",
            extendsTypeExpressions: [{ text: "MyBaseClass" }],
            implementsTypeExpressions: [{ text: "MyInterface" }],
            properties: [{
                name: "name",
                typeExpression: {
                    text: "string"
                }
            }]
        }]
    });
});
