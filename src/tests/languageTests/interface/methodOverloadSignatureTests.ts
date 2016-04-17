import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("interface method overload signature tests", () => {
    const code = `
interface MyInterface {
    myMethod<T>(num: number, t: T): number;
    myMethod<T>(str: string, t: T): string;
    myMethod<T>(myStringOrNumber: string | number, t: T): string | number;
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        interfaces: [{
            name: "MyInterface",
            methods: [{
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
