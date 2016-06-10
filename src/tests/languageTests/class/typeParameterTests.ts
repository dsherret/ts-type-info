import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("class type parameters", () => {
    const code = `
class MyClass<T, U extends string> {
    tProp: T;
    uProp: U;
}

class MyExtendsClass extends MyClass<number, string> {
}

class MyImplementsClass implements MyClass<number, string> {
    tProp: number;
    uProp: string;
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyClass",
            typeParameters: [{
                name: "T"
            }, {
                name: "U",
                constraintType: { text: "string" }
            }],
            properties: [{
                name: "tProp",
                type: { text: "T" }
            }, {
                name: "uProp",
                type: { text: "U" }
            }]
        }, {
            name: "MyExtendsClass",
            extendsTypes: [{
                text: "MyClass<number, string>"
            }]
        }, {
            name: "MyImplementsClass",
            implementsTypes: [{
                text: "MyClass<number, string>"
            }],
            properties: [{
                name: "tProp",
                type: { text: "number" }
            }, {
                name: "uProp",
                type: { text: "string" }
            }]
        }]
    });
});
