import {getInfoFromString} from "./../../../main";
import {Scope} from "./../../../definitions";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("class static method", () => {
    const code = `
class MyClassWithStaticMethods {
    // parameters
    static myParameterMethod(myParameter: string, myDefaultParameter = "some string", myOptionalParameter?: string, ...myRestParameter: number[]) {
        return "";
    }

    static myThisTypeMethod(this: string, num: number) {
    }

    // return types
    static myExplicitReturnTypeMethod(): string {
        return null;
    }

    static myImplicitReturnTypeMethod() {
        return "";
    }

    // scope
    public static myPublicMethod() {
    }

    protected static myProtectedMethod() {
    }

    private static myPrivateMethod() {
    }

    // async
    static async myAsyncMethod(): any {
    }
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyClassWithStaticMethods",
            staticMethods: [{
                name: "myParameterMethod",
                parameters: [{
                    name: "myParameter",
                    type: { text: "string" }
                }, {
                    name: "myDefaultParameter",
                    type: { text: "string" },
                    isOptional: true,
                    defaultExpression: { text: `"some string"` }
                }, {
                    name: "myOptionalParameter",
                    type: { text: "string" },
                    isOptional: true
                }, {
                    name: "myRestParameter",
                    type: {
                        text: "number[]",
                        isArray: true,
                        arrayElementType: { text: "number" }
                    },
                    isOptional: true,
                    isRestParameter: true
                }],
                returnType: { text: "string" }
            }, {
                name: "myThisTypeMethod",
                thisType: { text: "string" },
                parameters: [{
                    name: "num",
                    type: { text: "number" }
                }]
            }, {
                name: "myExplicitReturnTypeMethod",
                returnType: { text: "string" }
            }, {
                name: "myImplicitReturnTypeMethod",
                returnType: { text: "string" }
            }, {
                name: "myPublicMethod",
                scope: Scope.Public
            }, {
                name: "myProtectedMethod",
                scope: Scope.Protected
            }, {
                name: "myPrivateMethod",
                scope: Scope.Private
            }, {
                name: "myAsyncMethod",
                isAsync: true,
                returnType: { text: "any" }
            }]
        }]
    });
});
