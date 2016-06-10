import * as assert from "assert";
import {ClassDefinition, Scope, ClassConstructorParameterScope} from "./../../../definitions";
import * as testHelpers from "./../../testHelpers";

describe("ClassDefinition", () => {
    describe("addExtends", () => {
        const c = new ClassDefinition();
        c.addExtends("test", "test2");

        it("should have two extends expressions", () => {
            assert.equal(c.extendsTypes.length, 2);
        });

        it("should have a test expression", () => {
            assert.equal(c.extendsTypes[0].text, "test");
        });
    });

    describe("addImplements", () => {
        const c = new ClassDefinition();
        c.addImplements("test", "test2");

        it("should have two implements expressions", () => {
            assert.equal(c.implementsTypes.length, 2);
        });

        it("should have a test expression", () => {
            assert.equal(c.implementsTypes[0].text, "test");
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

        testHelpers.runClassMethodDefinitionTests(c.methods[0], {
            decorators: [{ name: "decorator" }],
            isAbstract: true,
            isAsync: true,
            returnType: { text: "string" },
            typeParameters: [{ name: "TypeParam", constraintType: { text: "string" } }],
            parameters: [{
                name: "myParam",
                decorators: [{ name: "paramDecorator", arguments: [{ text: `"test"` }] }],
                defaultExpression: { text: "5" },
                type: { text: "number" },
                isOptional: true,
                isRestParameter: true
            }],
            name: "myMethod",
            scope: Scope.Private,
            hasOnWriteFunctionBody: true
        });

        testHelpers.runClassMethodDefinitionTests(c.methods[1], {
            name: "mySecondMethod"
        });
    });

    describe("addProperties", () => {
        const c = new ClassDefinition();

        c.addProperties({
            decorators: [{ name: "decorator" }],
            defaultExpression: "4",
            isAccessor: true,
            isOptional: true,
            isReadonly: true,
            name: "myProperty",
            scope: Scope.Private,
            type: "string",
            onWriteGetBody: (writer) => writer.write(""),
            onWriteSetBody: (writer) => writer.write("")
        }, {
            name: "mySecondProperty"
        });

        testHelpers.runClassPropertyDefinitionTests(c.properties[0], {
            decorators: [{ name: "decorator" }],
            defaultExpression: { text: "4" },
            isAccessor: true,
            isOptional: true,
            isReadonly: true,
            name: "myProperty",
            scope: Scope.Private,
            type: { text: "string" },
            hasOnWriteGetBody: true,
            hasOnWriteSetBody: true
        });
        testHelpers.runClassPropertyDefinitionTests(c.properties[1], {
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

        testHelpers.runClassStaticMethodDefinitionTests(c.staticMethods[0], {
            decorators: [{ name: "decorator" }],
            isAsync: true,
            returnType: { text: "string" },
            typeParameters: [{ name: "TypeParam", constraintType: { text: "string" } }],
            parameters: [{
                name: "myParam",
                decorators: [{ name: "paramDecorator", arguments: [{ text: `"test"` }] }],
                defaultExpression: { text: "5" },
                type: { text: "number" },
                isOptional: true,
                isRestParameter: true
            }],
            name: "myStaticMethod",
            scope: Scope.Private
        });

        testHelpers.runClassStaticMethodDefinitionTests(c.staticMethods[1], {
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

        testHelpers.runClassStaticPropertyDefinitionTests(c.staticProperties[0], {
            decorators: [{ name: "decorator" }],
            defaultExpression: { text: "4" },
            isOptional: true,
            name: "myStaticProperty",
            scope: Scope.Private,
            type: { text: "string" }
        });
        testHelpers.runClassStaticPropertyDefinitionTests(c.staticProperties[1], {
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
            testHelpers.runClassConstructorDefinitionTests(c.constructorDef, {
                parameters: [{ name: "param1" }, { name: "param2", scope: ClassConstructorParameterScope.Private }],
                hasOnWriteFunctionBody: true
            });
        });
    });
});
