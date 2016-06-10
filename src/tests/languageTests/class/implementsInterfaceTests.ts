import {getInfoFromString} from "./../../../main";
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

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        interfaces: [{
            name: "MyInterface",
            properties: [{
                name: "name",
                type: {
                    text: "string"
                }
            }]
        }, {
            name: "MyTest",
            properties: [{
                name: "name2",
                type: {
                    text: "string"
                }
            }]
        }],
        classes: [{
            name: "MyClassImplementsInterface",
            implementsTypes: [{ text: "MyInterface" }, { text: "MyTest" }],
            properties: [{
                name: "name",
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
