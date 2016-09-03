import {getInfoFromString} from "./../../../main";
import {Scope} from "./../../../definitions";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("class method", () => {
    const code = `
class MyClass {
    // parameters
    myParameterMethod(myParameter: string, myDefaultParameter = 15, myOptionalParameter?: string, ...myRestParameter: number[]) {
        return "";
    }

    myThisTypeMethod(this: string, num: number) {
    }

    // return types
    myExplicitReturnTypeMethod(): string {
        return null;
    }

    myImplicitReturnTypeMethod() {
        return "";
    }

    // scope
    public myPublicMethod() {
    }

    protected myProtectedMethod() {
    }

    private myPrivateMethod() {
    }

    // async
    async myAsyncMethod(): any {
    }

    // user defined type guard
    myUserDefinedTypeGuard(): this is MyClass {
    }
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyClass",
            methods: [{
                name: "myParameterMethod",
                parameters: [{
                    name: "myParameter",
                    type: { text: "string" }
                }, {
                    name: "myDefaultParameter",
                    type: { text: "number" },
                    isOptional: true,
                    defaultExpression: { text: "15" }
                }, {
                    name: "myOptionalParameter",
                    type: { text: "string" },
                    isOptional: true
                }, {
                    name: "myRestParameter",
                    type: { text: "number[]", isArray: true, arrayElementType: { text: "number" } },
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
            }, {
                name: "myUserDefinedTypeGuard",
                userDefinedTypeGuard: {
                    type: "MyClass"
                },
                returnType: {
                    text: "this is MyClass",
                    unionTypes: [{
                        text: "true"
                    }, {
                        text: "false"
                    }]
                }
            }]
        }]
    });
});
