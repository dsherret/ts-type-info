import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("class implements interface tests", () => {
    const code = `
interface MyInterface {
    name: string;
}

interface MyTest {
    name2: string;
}

class MyClassImplementsInterface implements MyInterface, MyTest {
    name: string;
    name2: string;
}
`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        interfaces: [{
            name: "MyInterface",
            properties: [{
                name: "name",
                typeExpression: {
                    text: "string"
                }
            }]
        }, {
            name: "MyTest",
            properties: [{
                name: "name2",
                typeExpression: {
                    text: "string"
                }
            }]
        }],
        classes: [{
            name: "MyClassImplementsInterface",
            implementsTypeExpressions: [{ text: "MyInterface" }, { text: "MyTest" }],
            properties: [{
                name: "name",
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
