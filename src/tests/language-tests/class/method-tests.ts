import * as assert from "assert";
import {getStringInfo} from "./../../../main";
import {Scope} from "./../../../scope";
import {runNamedDefinitionTests,
        runScopedDefinitionTests} from "./../../test-helpers";

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

    describe("method myParameterMethod", () => {
        const method = def.classes[0].methods[0];

        runNamedDefinitionTests(method, "myParameterMethod");

        it("should have one parameter", () => {
            assert.equal(method.parameters.length, 1);
        });

        describe("parameter myParameter", () => {
            const param = method.parameters[0];

            it("should have name myParameter", () => {
                assert.equal(param.name, "myParameter");
            });

            it("should be type string", () => {
                assert.equal(param.type.name, "string");
            });
        });
    });

    describe("method myExplicitReturnTypeMethod", () => {
        const method = def.classes[0].methods[1];

        runNamedDefinitionTests(method, "myExplicitReturnTypeMethod");

        it("should have a return type of string", () => {
            assert.equal(method.returnType.name, "string");
        });
    });

    describe("method myImplicitReturnTypeMethod", () => {
        const method = def.classes[0].methods[2];

        runNamedDefinitionTests(method, "myImplicitReturnTypeMethod");

        it("should have a string return type when specified implicitly", () => {
            assert.equal(method.returnType.name, "string");
        });
    });

    describe("method myPublicMethod", () => {
        const method = def.classes[0].methods[3];

        runNamedDefinitionTests(method, "myPublicMethod");
        runScopedDefinitionTests(method, Scope.public);
    });

    describe("method myProtectedMethod", () => {
        const method = def.classes[0].methods[4];

        runNamedDefinitionTests(method, "myProtectedMethod");
        runScopedDefinitionTests(method, Scope.protected);
    });

    describe("method myPrivateMethod", () => {
        const method = def.classes[0].methods[5];

        runNamedDefinitionTests(method, "myPrivateMethod");
        runScopedDefinitionTests(method, Scope.private);
    });
});
