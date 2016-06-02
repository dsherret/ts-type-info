import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("function name tests", () => {
    const code = `
function myFunction() {
}
function myFunctionWithParameters(str: string, optionalParam?: string, defaultParam = new Date(), ...restParam: string[]) {
    return new Date();
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
                typeExpression: { text: "string" }
            }, {
                name: "optionalParam",
                typeExpression: { text: "string" },
                isOptional: true
            }, {
                name: "defaultParam",
                typeExpression: { text: "Date" },
                defaultExpression: { text: "new Date()" },
                isOptional: true
            }, {
                name: "restParam",
                typeExpression: { text: "string[]" },
                isOptional: true,
                isRestParameter: true
            }],
            returnTypeExpression: {
                text: "Date"
            }
        }, {
            name: "myAsyncFunction",
            isAsync: true,
            returnTypeExpression: { text: "any" }
        }, {
            name: "typeGuardFunction",
            parameters: [{ name: "def" }],
            returnTypeExpression: { text: "def is MyClass" },
            userDefinedTypeGuard: {
                parameterName: "def",
                type: "MyClass"
            }
        }, {
            name: "typeGuardFunctionIntersect",
            parameters: [{ name: "def" }],
            returnTypeExpression: { text: "def is MyClass & MyClass2" },
            userDefinedTypeGuard: {
                parameterName: "def",
                type: "MyClass & MyClass2"
            }
        }, {
            name: "myGeneratorFunction",
            isGenerator: true,
            returnTypeExpression: { text: "IterableIterator<string>" }
        }],
        classes: [{
            name: "MyClass"
        }, {
            name: "MyClass2"
        }]
    });
});
