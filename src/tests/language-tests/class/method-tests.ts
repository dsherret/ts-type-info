import {getStringInfo} from "./../../../main";
import {Scope} from "./../../../definitions";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("class method", () => {
    const code = `
class MyClass {
    // parameters
    myParameterMethod(myParameter: string, myDefaultParameter = 15, myOptionalParameter?: string, ...myRestParameter: number[]) {
        return "";
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
}`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyClass",
            methods: [{
                name: "myParameterMethod",
                parameters: [{
                    name: "myParameter",
                    typeExpression: { text: "string" }
                }, {
                    name: "myDefaultParameter",
                    typeExpression: { text: "number" },
                    isOptional: true,
                    defaultExpression: { text: "15" }
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
            }]
        }]
    });
});
