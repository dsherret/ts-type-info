import * as assert from "assert";
import {ClassDefinition, Scope} from "./../../../definitions";
import {runClassPropertyDefinitionTests} from "./../../testHelpers";

describe("ClassDefinition", () => {
    describe("addExtends", () => {
        const c = new ClassDefinition();
        c.addExtends("test", "test2");

        it("should have two extends expressions", () => {
            assert.equal(c.extendsTypeExpressions.length, 2);
        });

        it("should have a test expression", () => {
            assert.equal(c.extendsTypeExpressions[0].text, "test");
        });
    });

    describe("addImplements", () => {
        const c = new ClassDefinition();
        c.addImplements("test", "test2");

        it("should have two implements expressions", () => {
            assert.equal(c.implementsTypeExpressions.length, 2);
        });

        it("should have a test expression", () => {
            assert.equal(c.implementsTypeExpressions[0].text, "test");
        });
    });

    describe("addProperty", () => {
        const c = new ClassDefinition();

        c.addProperty({
            decorators: [{ name: "decorator" }],
            defaultExpression: "4",
            isAccessor: true,
            isConstructorParameter: true,
            isOptional: true,
            isReadonly: true,
            name: "myProperty",
            scope: Scope.Private,
            type: "string"
        });

        runClassPropertyDefinitionTests(c.properties[0], {
            decorators: [{ name: "decorator" }],
            defaultExpression: { text: "4" },
            isAccessor: true,
            isConstructorParameter: true,
            isOptional: true,
            isReadonly: true,
            name: "myProperty",
            scope: Scope.Private,
            typeExpression: { text: "string" }
        });
    });
});
