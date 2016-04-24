import * as assert from "assert";
import {ClassDefinition, Scope, ClassConstructorParameterScope} from "./../../../definitions";
import {runClassMethodDefinitionTests, runClassPropertyDefinitionTests, runClassConstructorDefinitionTests, runClassStaticMethodDefinitionTests,
    runClassStaticPropertyDefinitionTests} from "./../../testHelpers";

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

    describe("addMethods", () => {
        const c = new ClassDefinition();

        c.addMethods({
            decorators: [{ name: "decorator" }],
            isAbstract: true,
            isAsync: true,
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
            scope: Scope.Private,
            onWriteFunctionBody: (writer) => writer.write("")
        }, {
            name: "mySecondMethod"
        });

        runClassMethodDefinitionTests(c.methods[0], {
            decorators: [{ name: "decorator" }],
            isAbstract: true,
            isAsync: true,
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
            scope: Scope.Private,
            hasOnWriteFunctionBody: true
        });

        runClassMethodDefinitionTests(c.methods[1], {
            name: "mySecondMethod"
        });
    });

    describe("addProperties", () => {
        const c = new ClassDefinition();

        c.addProperties({
            decorators: [{ name: "decorator" }],
            defaultExpression: "4",
            isAccessor: true,
            isConstructorParameter: true,
            isOptional: true,
            isReadonly: true,
            name: "myProperty",
            scope: Scope.Private,
            type: "string"
        }, {
            name: "mySecondProperty"
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
        runClassPropertyDefinitionTests(c.properties[1], {
            name: "mySecondProperty"
        });
    });

    describe("addStaticMethods", () => {
        const c = new ClassDefinition();

        c.addStaticMethods({
            decorators: [{ name: "decorator" }],
            isAsync: true,
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
            name: "myStaticMethod",
            scope: Scope.Private
        }, {
            name: "mySecondStaticMethod"
        });

        runClassStaticMethodDefinitionTests(c.staticMethods[0], {
            decorators: [{ name: "decorator" }],
            isAsync: true,
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
            name: "myStaticMethod",
            scope: Scope.Private
        });

        runClassStaticMethodDefinitionTests(c.staticMethods[1], {
            name: "mySecondStaticMethod"
        });
    });

    describe("addStaticProperties", () => {
        const c = new ClassDefinition();

        c.addStaticProperties({
            decorators: [{ name: "decorator" }],
            defaultExpression: "4",
            isOptional: true,
            name: "myStaticProperty",
            scope: Scope.Private,
            type: "string"
        }, {
            name: "mySecondStaticProperty"
        });

        runClassStaticPropertyDefinitionTests(c.staticProperties[0], {
            decorators: [{ name: "decorator" }],
            defaultExpression: { text: "4" },
            isOptional: true,
            name: "myStaticProperty",
            scope: Scope.Private,
            typeExpression: { text: "string" }
        });
        runClassStaticPropertyDefinitionTests(c.staticProperties[1], {
            name: "mySecondStaticProperty"
        });
    });

    describe("setConstructor", () => {
        const c = new ClassDefinition();

        c.setConstructor({
            parameters: [{ name: "param1" }, { name: "param2", scope: ClassConstructorParameterScope.Private }],
            onWriteFunctionBody: (writer) => writer.write("")
        });

        describe("constructor", () => {
            runClassConstructorDefinitionTests(c.constructorDef, {
                parameters: [{ name: "param1" }, { name: "param2", scope: ClassConstructorParameterScope.Private }],
                hasOnWriteFunctionBody: true
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
