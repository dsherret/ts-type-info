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
                type: {
                    text: "string"
                }
            }]
        }],
        classes: [{
            name: "MyBaseClass",
            properties: [{
                name: "prop",
                type: {
                    text: "string"
                }
            }]
        }, {
            name: "MyExtendsImplementsClass",
            extendsTypes: [{ text: "MyBaseClass" }],
            implementsTypes: [{ text: "MyInterface" }],
            properties: [{
                name: "name",
                type: {
                    text: "string"
                }
            }]
        }]
    });
});
