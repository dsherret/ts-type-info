import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("function name tests", () => {
    const code = `
function myFunction() {
}
function myFunctionWithParameters(str: string, optionalParam?: string, defaultParam = new Date(), ...restParam: MyClass[]) {
    return new Date();
}
function myFunctionWithThisType(this: string, num: number) {
}
async function myAsyncFunction(): any {
}
function typeGuardFunction(def: any): def is MyClass {
    return true;
}
function typeGuardFunctionIntersect(def: any): def is MyClass & MyClass2 {
    return true;
}
function *myGeneratorFunction() {
    yield "test";
}
class MyClass {
}
class MyClass2 {
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        functions: [{
            name: "myFunction"
        }, {
            name: "myFunctionWithParameters",
            parameters: [{
                name: "str",
                type: { text: "string" }
            }, {
                name: "optionalParam",
                type: { text: "string" },
                isOptional: true
            }, {
                name: "defaultParam",
                type: { text: "Date" },
                defaultExpression: { text: "new Date()" },
                isOptional: true
            }, {
                name: "restParam",
                type: { text: "MyClass[]", isArrayType: true, arrayElementType: { text: "MyClass" } },
                isOptional: true,
                isRestParameter: true
            }],
            returnType: {
                text: "Date"
            }
        }, {
            name: "myFunctionWithThisType",
            thisType: { text: "string" },
            parameters: [{
                name: "num",
                type: { text: "number" }
            }]
        }, {
            name: "myAsyncFunction",
            isAsync: true,
            returnType: { text: "any" }
        }, {
            name: "typeGuardFunction",
            parameters: [{ name: "def" }],
            returnType: {
                text: "def is MyClass"
            },
            userDefinedTypeGuard: {
                parameterName: "def",
                type: "MyClass"
            }
        }, {
            name: "typeGuardFunctionIntersect",
            parameters: [{ name: "def" }],
            returnType: {
                text: "def is MyClass & MyClass2"
            },
            userDefinedTypeGuard: {
                parameterName: "def",
                type: "MyClass & MyClass2"
            }
        }, {
            name: "myGeneratorFunction",
            isGenerator: true,
            returnType: { text: "IterableIterator<string>" }
        }],
        classes: [{
            name: "MyClass"
        }, {
            name: "MyClass2"
        }]
    });
});
