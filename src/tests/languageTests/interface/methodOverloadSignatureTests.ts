import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("method overload signature tests", () => {
    const code = `
interface MyInterface {
    myMethod<T>(num: number, t: T): number;
    myMethod<T>(str: string, t: T): string;
    myMethod<T>(myStringOrNumber: string | number, t: T): string;
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
                        type: { text: "number" }
                    }, {
                        name: "t",
                        type: { text: "T" }
                    }],
                    typeParameters: [{
                        name: "T"
                    }],
                    returnType: { text: "number" },
                    minArgumentCount: 2
                }, {
                    parameters: [{
                        name: "str",
                        type: { text: "string" }
                    }, {
                        name: "t",
                        type: { text: "T" }
                    }],
                    typeParameters: [{
                        name: "T"
                    }],
                    returnType: { text: "string" },
                    minArgumentCount: 2
                }],
                parameters: [{
                    name: "myStringOrNumber",
                    type: {
                        text: "string | number",
                        unionTypes: [{
                            text: "string"
                        }, {
                            text: "number"
                        }]
                    }
                }, {
                    name: "t",
                    type: { text: "T" }
                }],
                typeParameters: [{
                    name: "T"
                }],
                returnType: {
                    text: "string"
                }
            }]
        }]
    });
});
