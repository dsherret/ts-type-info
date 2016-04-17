import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("class method overload signature tests", () => {
    const code = `
class MyClass {
    static myMethod<T>(num: number, t: T): number;
    static myMethod<T>(str: string, t: T): string;
    static myMethod<T>(myStringOrNumber: string | number, t: T): string | number {
    }
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyClass",
            staticMethods: [{
                name: "myMethod",
                overloadSignatures: [{
                    parameters: [{
                        name: "num",
                        typeExpression: { text: "number" }
                    }, {
                        name: "t",
                        typeExpression: { text: "T" }
                    }],
                    typeParameters: [{
                        name: "T"
                    }],
                    returnTypeExpression: { text: "number" },
                    minArgumentCount: 2
                }, {
                    parameters: [{
                        name: "str",
                        typeExpression: { text: "string" }
                    }, {
                        name: "t",
                        typeExpression: { text: "T" }
                    }],
                    typeParameters: [{
                        name: "T"
                    }],
                    returnTypeExpression: { text: "string" },
                    minArgumentCount: 2
                }],
                parameters: [{
                    name: "myStringOrNumber",
                    typeExpression: { text: "string | number" }
                }, {
                    name: "t",
                    typeExpression: { text: "T" }
                }],
                typeParameters: [{
                    name: "T"
                }],
                returnTypeExpression: { text: "string | number" }
            }]
        }]
    });
});
