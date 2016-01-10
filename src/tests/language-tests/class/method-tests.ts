import {getStringInfo} from "./../../../main";
import {Scope} from "./../../../scope";
import {runClassMethodDefinitionTests} from "./../../test-helpers";

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
    runClassMethodDefinitionTests(def.classes[0].methods[0], {
        name: "myParameterMethod",
        scope: Scope.public,
        returnType: "string",
        parameters: [{
            name: "myParameter",
            type: "string"
        }, {
            name: "myDefaultParameter",
            type: "number",
            isOptional: true,
            defaultExpressionText: "15"
        }, {
            name: "myOptionalParameter",
            type: "string",
            isOptional: true
        }, {
            name: "myRestParameter",
            type: "number[]",
            isOptional: true,
            isRestParameter: true
        }]
    });

    runClassMethodDefinitionTests(def.classes[0].methods[1], {
        name: "myExplicitReturnTypeMethod",
        scope: Scope.public,
        returnType: "string",
        parameters: []
    });

    runClassMethodDefinitionTests(def.classes[0].methods[2], {
        name: "myImplicitReturnTypeMethod",
        scope: Scope.public,
        returnType: "string",
        parameters: []
    });

    runClassMethodDefinitionTests(def.classes[0].methods[3], {
        name: "myPublicMethod",
        scope: Scope.public,
        returnType: "void",
        parameters: []
    });

    runClassMethodDefinitionTests(def.classes[0].methods[4], {
        name: "myProtectedMethod",
        scope: Scope.protected,
        returnType: "void",
        parameters: []
    });

    runClassMethodDefinitionTests(def.classes[0].methods[5], {
        name: "myPrivateMethod",
        scope: Scope.private,
        returnType: "void",
        parameters: []
    });
});
