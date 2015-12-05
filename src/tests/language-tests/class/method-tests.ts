import * as assert from "assert";
import {getStringInfo} from "./../../../main";
import {Scope} from "./../../../scope";
import {runMethodDefinitionTests} from "./../../test-helpers";

describe("class method", () => {
    const code = `
class MyClass {
    // parameters
    myParameterMethod(myParameter: string) {
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

    runMethodDefinitionTests(def.classes[0].methods[0], {
        name: "myParameterMethod",
        scope: Scope.public,
        returnType: "string",
        parameters: [{
            name: "myParameter",
            type: "string"
        }]
    });

    runMethodDefinitionTests(def.classes[0].methods[1], {
        name: "myExplicitReturnTypeMethod",
        scope: Scope.public,
        returnType: "string",
        parameters: []
    });

    runMethodDefinitionTests(def.classes[0].methods[2], {
        name: "myImplicitReturnTypeMethod",
        scope: Scope.public,
        returnType: "string",
        parameters: []
    });

    runMethodDefinitionTests(def.classes[0].methods[3], {
        name: "myPublicMethod",
        scope: Scope.public,
        returnType: "void",
        parameters: []
    });

    runMethodDefinitionTests(def.classes[0].methods[4], {
        name: "myProtectedMethod",
        scope: Scope.protected,
        returnType: "void",
        parameters: []
    });

    runMethodDefinitionTests(def.classes[0].methods[5], {
        name: "myPrivateMethod",
        scope: Scope.private,
        returnType: "void",
        parameters: []
    });
});
