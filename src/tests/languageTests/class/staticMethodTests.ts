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
                    typeExpression: { text: "string" }
                }, {
                    name: "myDefaultParameter",
                    typeExpression: { text: "string" },
                    isOptional: true,
                    defaultExpression: { text: `"some string"` }
                }, {
                    name: "myOptionalParameter",
                    typeExpression: { text: "string" },
                    isOptional: true
                }, {
                    name: "myRestParameter",
                    typeExpression: { text: "number[]" },
                    isOptional: true,
                    isRestParameter: true
                }],
                returnTypeExpression: { text: "string" }
            }, {
                name: "myExplicitReturnTypeMethod",
                returnTypeExpression: { text: "string" }
            }, {
                name: "myImplicitReturnTypeMethod",
                returnTypeExpression: { text: "string" }
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
                returnTypeExpression: { text: "any" }
            }]
        }]
    });
});
