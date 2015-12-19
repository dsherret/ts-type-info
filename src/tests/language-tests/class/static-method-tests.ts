import {getStringInfo} from "./../../../main";
import {Scope} from "./../../../scope";
import {runStaticMethodDefinitionTests} from "./../../test-helpers";

describe("class static method", () => {
    const code = `
class MyClassWithStaticMethods {
    // parameters
    static myParameterMethod(myParameter: string, myDefaultParameter = 15, myOptionalParameter?: string, ...myRestParameter: number[]) {
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
}`;

    const def = getStringInfo(code);

    runStaticMethodDefinitionTests(def.classes[0].staticMethods[0], {
        name: "myParameterMethod",
        scope: Scope.public,
        returnType: "string",
        parameters: [{
            name: "myParameter",
            type: "string"
        }, {
            name: "myDefaultParameter",
            type: "number",
            isOptional: true
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

    runStaticMethodDefinitionTests(def.classes[0].staticMethods[1], {
        name: "myExplicitReturnTypeMethod",
        scope: Scope.public,
        returnType: "string",
        parameters: []
    });

    runStaticMethodDefinitionTests(def.classes[0].staticMethods[2], {
        name: "myImplicitReturnTypeMethod",
        scope: Scope.public,
        returnType: "string",
        parameters: []
    });

    runStaticMethodDefinitionTests(def.classes[0].staticMethods[3], {
        name: "myPublicMethod",
        scope: Scope.public,
        returnType: "void",
        parameters: []
    });

    runStaticMethodDefinitionTests(def.classes[0].staticMethods[4], {
        name: "myProtectedMethod",
        scope: Scope.protected,
        returnType: "void",
        parameters: []
    });

    runStaticMethodDefinitionTests(def.classes[0].staticMethods[5], {
        name: "myPrivateMethod",
        scope: Scope.private,
        returnType: "void",
        parameters: []
    });
});
