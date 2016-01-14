import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

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

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyClass",
            typeParameters: [{
                name: "T"
            }, {
                name: "U",
                constraintTypeExpression: { text: "string" }
            }],
            properties: [{
                name: "tProp",
                typeExpression: { text: "T" }
            }, {
                name: "uProp",
                typeExpression: { text: "U" }
            }]
        }, {
            name: "MyExtendsClass",
            extends: [{
                text: "MyClass<number, string>"
            }]
        }, {
            name: "MyImplementsClass",
            implements: [{
                text: "MyClass<number, string>"
            }],
            properties: [{
                name: "tProp",
                typeExpression: { text: "number" }
            }, {
                name: "uProp",
                typeExpression: { text: "string" }
            }]
        }]
    });
});
