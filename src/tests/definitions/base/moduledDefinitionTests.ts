﻿import * as assert from "assert";
import {createVariable} from "./../../../createFunctions";
import {NamespaceDefinition, NamespaceDeclarationType, VariableDeclarationType} from "./../../../definitions";
import * as testHelpers from "./../../testHelpers";

describe("ModuledDefinitionTests", () => {
    describe("addClasses", () => {
        const n = new NamespaceDefinition();
        n.addClasses({
            name: "class1",
            constructorDef: { parameters: [{ name: "param1" }] },
            decorators: [{ name: "dec1" }],
            extendsTypes: ["class2"],
            implementsTypes: ["interface1"],
            hasDeclareKeyword: true,
            isAbstract: true,
            isAmbient: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isNamedExportOfFile: true,
            methods: [{ name: "method1" }],
            properties: [{ name: "prop1" }],
            staticMethods: [{ name: "staticMethod1" }],
            staticProperties: [{ name: "staticProp1" }],
            typeParameters: [{ name: "T" }]
        }, {
            name: "class2"
        });

        testHelpers.runClassDefinitionTests(n.classes[0], {
            name: "class1",
            constructorDef: { parameters: [{ name: "param1" }] },
            decorators: [{ name: "dec1" }],
            extendsTypeExpressions: [{ text: "class2" }],
            implementsTypeExpressions: [{ text: "interface1" }],
            hasDeclareKeyword: true,
            isAbstract: true,
            isAmbient: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isNamedExportOfFile: true,
            methods: [{ name: "method1" }],
            properties: [{ name: "prop1" }],
            staticMethods: [{ name: "staticMethod1" }],
            staticProperties: [{ name: "staticProp1" }],
            typeParameters: [{ name: "T" }]
        });
        testHelpers.runClassDefinitionTests(n.classes[1], {
            name: "class2"
        });
    });

    describe("addEnums", () => {
        const n = new NamespaceDefinition();
        n.addEnums({
            name: "enum1",
            hasDeclareKeyword: true,
            isAmbient: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isNamedExportOfFile: true,
            members: [{ name: "member1", value: 1 }, { name: "member2", value: 2 }]
        }, {
            name: "enum2"
        });

        testHelpers.runEnumDefinitionTests(n.enums[0], {
            name: "enum1",
            hasDeclareKeyword: true,
            isAmbient: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isNamedExportOfFile: true,
            members: [{ name: "member1", value: 1 }, { name: "member2", value: 2 }]
        });
        testHelpers.runEnumDefinitionTests(n.enums[1], {
            name: "enum2"
        });
    });

    describe("addFunctions", () => {
        const n = new NamespaceDefinition();
        n.addFunctions({
            name: "function1",
            hasDeclareKeyword: true,
            isAmbient: true,
            isAsync: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isNamedExportOfFile: true,
            parameters: [{ name: "param1" }, { name: "param2" }],
            returnType: "string",
            typeParameters: [{ name: "T" }, { name: "U" }],
            onWriteFunctionBody: (writer) => writer.write("")
        }, {
            name: "function2"
        });

        testHelpers.runFunctionDefinitionTests(n.functions[0], {
            name: "function1",
            hasDeclareKeyword: true,
            isAmbient: true,
            isAsync: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isNamedExportOfFile: true,
            parameters: [{ name: "param1" }, { name: "param2" }],
            returnTypeExpression: { text: "string" },
            typeParameters: [{ name: "T" }, { name: "U" }],
            hasOnWriteFunctionBody: true
        });
        testHelpers.runFunctionDefinitionTests(n.functions[1], {
            name: "function2"
        });
    });

    describe("addInterfaces", () => {
        const n = new NamespaceDefinition();
        n.addInterfaces({
            name: "Interface1",
            extendsTypes: ["Extend"],
            hasDeclareKeyword: true,
            isAmbient: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isNamedExportOfFile: true,
            methods: [{
                name: "method1"
            }],
            callSignatures: [{
                parameters: [{ name: "param1" }]
            }],
            newSignatures: [{
                parameters: [{ name: "param1" }]
            }],
            properties: [{
                name: "prop1"
            }],
            typeParameters: [{
                name: "typeParam"
            }]
        }, {
            name: "Interface2"
        });

        testHelpers.runInterfaceDefinitionTests(n.interfaces[0], {
            name: "Interface1",
            extendsTypeExpressions: [{ text: "Extend" }],
            hasDeclareKeyword: true,
            isAmbient: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isNamedExportOfFile: true,
            methods: [{
                name: "method1"
            }],
            callSignatures: [{
                parameters: [{ name: "param1" }],
                minArgumentCount: 1
            }],
            newSignatures: [{
                parameters: [{ name: "param1" }],
                minArgumentCount: 1
            }],
            properties: [{
                name: "prop1"
            }],
            typeParameters: [{
                name: "typeParam"
            }]
        });
        testHelpers.runInterfaceDefinitionTests(n.interfaces[1], {
            name: "Interface2"
        });
    });

    describe("addNamespaces", () => {
        const n = new NamespaceDefinition();
        n.addNamespaces({
            name: "namespace1",
            declarationType: NamespaceDeclarationType.Module,
            classes: [{ name: "class1" }],
            enums: [{ name: "enum1" }],
            functions: [{ name: "function1" }],
            hasDeclareKeyword: true,
            interfaces: [{ name: "interface1" }],
            isAmbient: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isNamedExportOfFile: true,
            namespaces: [{ name: "namespace1" }],
            typeAliases: [{ name: "typeAlias1", type: "string" }],
            variables: [{ name: "variable1" }]
        }, {
            name: "namespace2"
        });

        testHelpers.runNamespaceDefinitionTests(n.namespaces[0], {
            name: "namespace1",
            declarationType: NamespaceDeclarationType.Module,
            classes: [{ name: "class1" }],
            enums: [{ name: "enum1" }],
            functions: [{ name: "function1" }],
            hasDeclareKeyword: true,
            interfaces: [{ name: "interface1" }],
            isAmbient: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isNamedExportOfFile: true,
            namespaces: [{ name: "namespace1", declarationType: NamespaceDeclarationType.Namespace }],
            typeAliases: [{ name: "typeAlias1", typeExpression: { text: "string" }}],
            variables: [{ name: "variable1", declarationType: VariableDeclarationType.Let }]
        });
        testHelpers.runNamespaceDefinitionTests(n.namespaces[1], {
            name: "namespace2",
            declarationType: NamespaceDeclarationType.Namespace // should default to namespace
        });
    });

    describe("addTypeAliases", () => {
        const n = new NamespaceDefinition();
        n.addTypeAliases({
            name: "typeAlias1",
            hasDeclareKeyword: true,
            isAmbient: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isNamedExportOfFile: true,
            type: "string",
            typeParameters: [{ name: "T" }]
        }, {
            name: "typeAlias2",
            type: "string"
        });

        testHelpers.runTypeAliasDefinitionTests(n.typeAliases[0], {
            name: "typeAlias1",
            hasDeclareKeyword: true,
            isAmbient: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isNamedExportOfFile: true,
            typeExpression: { text: "string" },
            typeParameters: [{ name: "T" }]
        });
        testHelpers.runTypeAliasDefinitionTests(n.typeAliases[1], {
            name: "typeAlias2",
            typeExpression: { text: "string" }
        });
    });

    describe("addVariables", () => {
        const n = new NamespaceDefinition();
        n.addVariables({
            name: "myVar1",
            declarationType: VariableDeclarationType.Const,
            defaultExpression: "5",
            hasDeclareKeyword: true,
            isAmbient: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isNamedExportOfFile: true,
            type: "number"
        }, {
            name: "myVar2"
        });

        testHelpers.runVariableDefinitionTests(n.variables[0], {
            name: "myVar1",
            declarationType: VariableDeclarationType.Const,
            defaultExpression: { text: "5" },
            hasDeclareKeyword: true,
            isAmbient: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isNamedExportOfFile: true,
            typeExpression: { text: "number" }
        });
        testHelpers.runVariableDefinitionTests(n.variables[1], {
            name: "myVar2",
            declarationType: VariableDeclarationType.Let // should default to let
        });
    });

    describe("getClass", () => {
        const n = new NamespaceDefinition();
        n.addClasses({ name: "name1" }, { name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getClass("name2"), { name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getClass(d => d.name === "name2"), { name: "name2" });
    });

    describe("getEnum", () => {
        const n = new NamespaceDefinition();
        n.addEnums({ name: "name1" }, { name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getEnum("name2"), { name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getEnum(d => d.name === "name2"), { name: "name2" });
    });

    describe("getFunction", () => {
        const n = new NamespaceDefinition();
        n.addFunctions({ name: "name1" }, { name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getFunction("name2"), { name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getFunction(d => d.name === "name2"), { name: "name2" });
    });

    describe("getInterface", () => {
        const n = new NamespaceDefinition();
        n.addInterfaces({ name: "name1" }, { name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getInterface("name2"), { name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getInterface(d => d.name === "name2"), { name: "name2" });
    });

    describe("getNamespace", () => {
        const n = new NamespaceDefinition();
        n.addNamespaces({ name: "name1" }, { name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getNamespace("name2"), { name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getNamespace(d => d.name === "name2"), { name: "name2" });
    });

    describe("getTypeAlias", () => {
        const n = new NamespaceDefinition();
        n.addTypeAliases({ name: "name1", type: "string" }, { name: "name2", type: "string" });
        testHelpers.runNamedDefinitionTests(n.getTypeAlias("name2"), { name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getTypeAlias(d => d.name === "name2"), { name: "name2" });
    });

    describe("getVariable", () => {
        const n = new NamespaceDefinition();
        n.addVariables({ name: "name1" }, { name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getVariable("name2"), { name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getVariable(d => d.name === "name2"), { name: "name2" });
    });

    describe("directlyContains", () => {
        const n = new NamespaceDefinition();
        n.addClasses({ name: "c" })
            .addEnums({ name: "e" })
            .addFunctions({ name: "f" })
            .addInterfaces({ name: "i" })
            .addNamespaces({ name: "n" })
            .addTypeAliases({ name: "t", type: "string" })
            .addVariables({ name: "v" });

        it("should contain the class", () => {
            assert.equal(n.directlyContains(n.classes[0]), true);
        });

        it("should contain the enum", () => {
            assert.equal(n.directlyContains(n.enums[0]), true);
        });

        it("should contain the function", () => {
            assert.equal(n.directlyContains(n.functions[0]), true);
        });

        it("should contain the interface", () => {
            assert.equal(n.directlyContains(n.interfaces[0]), true);
        });

        it("should contain the namespace", () => {
            assert.equal(n.directlyContains(n.namespaces[0]), true);
        });

        it("should contain the type alias", () => {
            assert.equal(n.directlyContains(n.typeAliases[0]), true);
        });

        it("should contain the variable", () => {
            assert.equal(n.directlyContains(n.variables[0]), true);
        });

        it("should not contain a definition not in the module", () => {
            assert.equal(n.directlyContains(createVariable({ name: "t" })), false);
        });
    });

    describe("#getNamespacesToDefinition()", () => {
        const def = new NamespaceDefinition();
        def.addVariables({ name: "v" });
        def.addNamespaces({
            name: "n1"
        }, {
            name: "n2",
            namespaces: [{
                name: "n3",
                variables: [{ name: "v1" }, { name: "v2" }]
            }]
        });

        describe("getting the namesapces to a variable directly in the namespace", () => {
            const namespaces = def.getNamespacesToDefinition(def.variables[0]);

            it("the array should have the correct length", () => {
                assert.equal(namespaces.length, 0);
            });
        });

        describe("getting the namesapces to a variable in a namespace within a namespace", () => {
            const namespaces = def.getNamespacesToDefinition(def.namespaces[1].namespaces[0].variables[1]);

            it("the array should have the correct length", () => {
                assert.equal(namespaces.length, 2);
            });

            it("should have the first namespace as the first item in the array", () => {
                assert.equal(namespaces[0], def.namespaces[1]);
            });

            it("should have the second namespace as the second item in the array", () => {
                assert.equal(namespaces[1], def.namespaces[1].namespaces[0]);
            });
        });

        describe("getting the namespaces to a variable not existing in any namespace", () => {
            const path = def.getNamespacesToDefinition(createVariable({ name: "v" }));

            it("path should be null", () => {
                assert.equal(path, null);
            });
        });
    });
});
