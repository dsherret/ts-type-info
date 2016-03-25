import * as assert from "assert";
import {ClassDefinition, Scope, ClassConstructorParameterScope} from "./../../../definitions";
import {runClassMethodDefinitionTests, runClassPropertyDefinitionTests, runClassConstructorDefinitionTests} from "./../../testHelpers";

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

    describe("addMethod", () => {
        const c = new ClassDefinition();

        c.addMethod({
            decorators: [{ name: "decorator" }],
            isAbstract: true,
            returnType: "string",
            typeParameters: [{ name: "TypeParam", constraintType: "string" }],
            parameters: [{
                name: "myParam",
                decorators: [{ name: "paramDecorator", arguments: [`"test"`] }],
                defaultExpression: "5",
                type: "number",
                isOptional: true,
                isRestParameter: true
            }],
            name: "myMethod",
            scope: Scope.Private
        });

        runClassMethodDefinitionTests(c.methods[0], {
            decorators: [{ name: "decorator" }],
            isAbstract: true,
            returnTypeExpression: { text: "string" },
            typeParameters: [{ name: "TypeParam", constraintTypeExpression: { text: "string" } }],
            parameters: [{
                name: "myParam",
                decorators: [{ name: "paramDecorator", arguments: [{ text: `"test"` }] }],
                defaultExpression: { text: "5" },
                typeExpression: { text: "number" },
                isOptional: true,
                isRestParameter: true
            }],
            name: "myMethod",
            scope: Scope.Private
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

    describe("setConstructor", () => {
        const c = new ClassDefinition();

        c.setConstructor({
            parameters: [{ name: "param1" }, { name: "param2", scope: ClassConstructorParameterScope.Private }]
        });

        describe("constructor", () => {
            runClassConstructorDefinitionTests(c.constructorDef, {
                parameters: [{ name: "param1" }, { name: "param2", scope: ClassConstructorParameterScope.Private }]
            });
        });

        describe("properties", () => {
            it(`should have 1 property`, () => {
                assert.equal(c.properties.length, 1);
            });

            runClassPropertyDefinitionTests(c.properties[0], {
                name: "param2",
                scope: Scope.Private,
                isConstructorParameter: true
            });
        });

        // should remove the previous properties set by the last setConstructor
        c.setConstructor({
            parameters: [{ name: "param3" }, { name: "param4", scope: ClassConstructorParameterScope.Public }]
        });

        describe("constructor", () => {
            runClassConstructorDefinitionTests(c.constructorDef, {
                parameters: [{ name: "param3" }, { name: "param4", scope: ClassConstructorParameterScope.Public }]
            });
        });

        describe("properties", () => {
            it(`should have 1 property`, () => {
                assert.equal(c.properties.length, 1);
            });

            runClassPropertyDefinitionTests(c.properties[0], {
                name: "param4",
                scope: Scope.Public,
                isConstructorParameter: true
            });
        });
    });
});
