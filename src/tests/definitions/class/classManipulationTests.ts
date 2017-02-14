import * as assert from "assert";
import {ClassDefinition, Scope, ClassConstructorParameterScope, ClassPropertyKind} from "./../../../definitions";
import {createClass, createInterface} from "./../../../createFunctions";
import * as testHelpers from "./../../testHelpers";

describe("ClassDefinition", () => {
    describe("#addExtends()", () => {
        describe("supplying a text", () => {
            const c = new ClassDefinition();
            const returnedDef = c.addExtends("test");
            c.addExtends("test2");

            it("the returned definition should be in the array", () => {
                assert.equal(returnedDef, c.extendsTypes[0]);
            });

            it("should have two extends expressions", () => {
                assert.equal(c.extendsTypes.length, 2);
            });

            it("should have the correct expression", () => {
                assert.equal(c.extendsTypes[0].text, "test");
            });
        });

        describe("supplying a definition without type arguments", () => {
            const baseClass = createClass({ name: "BaseClass" });
            const c = new ClassDefinition();
            const returnedDef = c.addExtends(baseClass);

            it("the returned definition should be in the array", () => {
                assert.equal(returnedDef, c.extendsTypes[0]);
            });

            it("should have the correct expression", () => {
                assert.equal(c.extendsTypes[0].text, "BaseClass");
            });
        });

        describe("supplying a definition with type arguments", () => {
            const baseClass = createClass({ name: "BaseClass" });
            const c = new ClassDefinition();

            describe("one type argument", () => {
                const returnedDef = c.addExtends(baseClass, ["string"]);

                it("the returned definition should be in the array", () => {
                    assert.equal(returnedDef, c.extendsTypes[0]);
                });

                it("should have the correct expression", () => {
                    assert.equal(c.extendsTypes[0].text, "BaseClass<string>");
                });
            });

            describe("multiple type arguments", () => {
                c.addExtends(baseClass, ["string", "number"]);

                it("should have the correct expression", () => {
                    assert.equal(c.extendsTypes[1].text, "BaseClass<string, number>");
                });
            });
        });
    });

    describe("#addImplements()", () => {
        describe("supplying a text", () => {
            const c = new ClassDefinition();
            const returnedDef = c.addImplements("test");
            c.addImplements("test2");

            it("the returned definition should be in the array", () => {
                assert.equal(returnedDef, c.implementsTypes[0]);
            });

            it("should have two implements expressions", () => {
                assert.equal(c.implementsTypes.length, 2);
            });

            it("should have the correct expression", () => {
                assert.equal(c.implementsTypes[0].text, "test");
            });
        });

        describe("supplying a definition without type arguments", () => {
            const baseClass = createClass({ name: "BaseClass" });
            const c = new ClassDefinition();
            const returnedDef = c.addImplements(baseClass);

            it("the returned definition should be in the array", () => {
                assert.equal(returnedDef, c.implementsTypes[0]);
            });

            it("should have the correct expression", () => {
                assert.equal(c.implementsTypes[0].text, "BaseClass");
            });
        });

        describe("supplying a definition with type arguments", () => {
            const baseInterface = createInterface({ name: "BaseInterface" });
            const c = new ClassDefinition();

            describe("one type argument", () => {
                const returnedDef = c.addImplements(baseInterface, ["string"]);

                it("the returned definition should be in the array", () => {
                    assert.equal(returnedDef, c.implementsTypes[0]);
                });

                it("should have the correct expression", () => {
                    assert.equal(c.implementsTypes[0].text, "BaseInterface<string>");
                });
            });

            describe("multiple type arguments", () => {
                c.addImplements(baseInterface, ["string", "number"]);

                it("should have the correct expression", () => {
                    assert.equal(c.implementsTypes[1].text, "BaseInterface<string, number>");
                });
            });
        });
    });

    describe("#addMethod()", () => {
        const c = new ClassDefinition();
        const returnedDef = c.addMethod({
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
            onWriteFunctionBody: (writer) => writer.write(""),
            documentationComment: "text"
        });
        c.addMethod({
            name: "mySecondMethod"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, c.methods[0]);
        });

        testHelpers.runClassMethodDefinitionTests(c.methods[0], {
            decorators: [{ name: "decorator" }],
            isAbstract: true,
            isAsync: true,
            returnType: { text: "string" },
            typeParameters: [{ name: "TypeParam", constraintType: { text: "string" } }],
            parameters: [{
                name: "myParam",
                decorators: [{ name: "paramDecorator", arguments: [{ text: `"test"` }], isDecoratorFactory: true }],
                defaultExpression: { text: "5" },
                type: { text: "number" },
                isOptional: true,
                isRestParameter: true
            }],
            name: "myMethod",
            scope: Scope.Private,
            hasOnWriteFunctionBody: true,
            documentationComment: "text"
        });

        testHelpers.runClassMethodDefinitionTests(c.methods[1], {
            name: "mySecondMethod"
        });
    });

    describe("#addProperty()", () => {
        const c = new ClassDefinition();
        const returnedDef = c.addProperty({
            isAbstract: true,
            decorators: [{ name: "decorator" }],
            defaultExpression: "4",
            kind: ClassPropertyKind.GetAccessor,
            isOptional: true,
            isReadonly: true,
            name: "myProperty",
            scope: Scope.Private,
            type: "string",
            onWriteGetBody: (writer) => writer.write(""),
            onWriteSetBody: (writer) => writer.write(""),
            documentationComment: "text"
        });
        c.addProperty({
            name: "mySecondProperty"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, c.properties[0]);
        });

        testHelpers.runClassPropertyDefinitionTests(c.properties[0], {
            isAbstract: true,
            decorators: [{ name: "decorator" }],
            defaultExpression: { text: "4" },
            kind: ClassPropertyKind.GetAccessor,
            isOptional: true,
            isReadonly: true,
            name: "myProperty",
            scope: Scope.Private,
            type: { text: "string" },
            hasOnWriteGetBody: true,
            hasOnWriteSetBody: true,
            documentationComment: "text"
        });
        testHelpers.runClassPropertyDefinitionTests(c.properties[1], {
            name: "mySecondProperty"
        });
    });

    describe("#addStaticMethod()", () => {
        const c = new ClassDefinition();
        const returnedDef = c.addStaticMethod({
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
            scope: Scope.Private,
            documentationComment: "text"
        });
        c.addStaticMethod({
            name: "mySecondStaticMethod"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, c.staticMethods[0]);
        });

        testHelpers.runClassStaticMethodDefinitionTests(c.staticMethods[0], {
            decorators: [{ name: "decorator" }],
            isAsync: true,
            returnType: { text: "string" },
            typeParameters: [{ name: "TypeParam", constraintType: { text: "string" } }],
            parameters: [{
                name: "myParam",
                decorators: [{ name: "paramDecorator", arguments: [{ text: `"test"` }], isDecoratorFactory: true }],
                defaultExpression: { text: "5" },
                type: { text: "number" },
                isOptional: true,
                isRestParameter: true
            }],
            name: "myStaticMethod",
            scope: Scope.Private,
            documentationComment: "text"
        });

        testHelpers.runClassStaticMethodDefinitionTests(c.staticMethods[1], {
            name: "mySecondStaticMethod"
        });
    });

    describe("#addStaticProperty()", () => {
        const c = new ClassDefinition();
        const returnedDef = c.addStaticProperty({
            decorators: [{ name: "decorator" }],
            defaultExpression: "4",
            isOptional: true,
            name: "myStaticProperty",
            scope: Scope.Private,
            type: "string",
            documentationComment: "text"
        });
        c.addStaticProperty({
            name: "mySecondStaticProperty"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, c.staticProperties[0]);
        });

        testHelpers.runClassStaticPropertyDefinitionTests(c.staticProperties[0], {
            decorators: [{ name: "decorator" }],
            defaultExpression: { text: "4" },
            isOptional: true,
            name: "myStaticProperty",
            scope: Scope.Private,
            type: { text: "string" },
            documentationComment: "text"
        });
        testHelpers.runClassStaticPropertyDefinitionTests(c.staticProperties[1], {
            name: "mySecondStaticProperty"
        });
    });

    describe("#setConstructor()", () => {
        const c = new ClassDefinition();

        c.setConstructor({
            scope: Scope.Private,
            parameters: [{ name: "param1" }, { name: "param2", scope: ClassConstructorParameterScope.Private }],
            onWriteFunctionBody: (writer) => writer.write(""),
            documentationComment: "text"
        });

        describe("constructor", () => {
            testHelpers.runClassConstructorDefinitionTests(c.constructorDef!, {
                scope: Scope.Private,
                parameters: [{ name: "param1" }, { name: "param2", scope: ClassConstructorParameterScope.Private }],
                hasOnWriteFunctionBody: true,
                documentationComment: "text"
            });
        });
    });
});
