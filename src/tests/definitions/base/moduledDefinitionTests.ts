import * as assert from "assert";
import {createVariable, createNamespace} from "./../../../createFunctions";
import {NamespaceDefinition, NamespaceDeclarationType, VariableDeclarationType} from "./../../../definitions";
import * as testHelpers from "./../../testHelpers";

describe("ModuledDefinitionTests", () => {
    describe("#addClass()", () => {
        const n = new NamespaceDefinition();
        const returnedDef = n.addClass({
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
        });
        n.addClass({
            name: "class2"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, n.classes[0]);
        });

        testHelpers.runClassDefinitionTests(n.classes[0], {
            name: "class1",
            order: 0,
            constructorDef: { parameters: [{ name: "param1" }] },
            decorators: [{ name: "dec1" }],
            extendsTypes: [{ text: "class2" }],
            implementsTypes: [{ text: "interface1" }],
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
            name: "class2",
            order: 1
        });
    });

    describe("#addEnum()", () => {
        const n = new NamespaceDefinition();
        const returnedDef = n.addEnum({
            name: "enum1",
            hasDeclareKeyword: true,
            isAmbient: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isNamedExportOfFile: true,
            isConst: true,
            members: [{ name: "member1", value: 1 }, { name: "member2", value: 2 }]
        });
        n.addEnum({
            name: "enum2"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, n.enums[0]);
        });

        testHelpers.runEnumDefinitionTests(n.enums[0], {
            name: "enum1",
            order: 0,
            hasDeclareKeyword: true,
            isAmbient: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isNamedExportOfFile: true,
            isConst: true,
            members: [{ name: "member1", value: 1 }, { name: "member2", value: 2 }]
        });
        testHelpers.runEnumDefinitionTests(n.enums[1], {
            name: "enum2",
            order: 1
        });
    });

    describe("addFunction", () => {
        const n = new NamespaceDefinition();
        const returnedDef = n.addFunction({
            name: "function1",
            hasDeclareKeyword: true,
            isAmbient: true,
            isAsync: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isGenerator: true,
            isNamedExportOfFile: true,
            parameters: [{ name: "param1" }, { name: "param2" }],
            returnType: "string",
            typeParameters: [{ name: "T" }, { name: "U" }],
            overloadSignatures: [{
                parameters: [{ name: "param1" }]
            }],
            onWriteFunctionBody: (writer) => writer.write("")
        });
        n.addFunction({
            name: "function2"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, n.functions[0]);
        });

        testHelpers.runFunctionDefinitionTests(n.functions[0], {
            name: "function1",
            order: 0,
            hasDeclareKeyword: true,
            isAmbient: true,
            isAsync: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isGenerator: true,
            isNamedExportOfFile: true,
            parameters: [{ name: "param1" }, { name: "param2" }],
            returnType: { text: "string" },
            typeParameters: [{ name: "T" }, { name: "U" }],
            overloadSignatures: [{
                parameters: [{ name: "param1" }],
                minArgumentCount: 1
            }],
            hasOnWriteFunctionBody: true
        });
        testHelpers.runFunctionDefinitionTests(n.functions[1], {
            name: "function2",
            order: 1
        });
    });

    describe("#addInterface()", () => {
        const n = new NamespaceDefinition();
        const returnedDef = n.addInterface({
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
        });
        n.addInterface({
            name: "Interface2"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, n.interfaces[0]);
        });

        testHelpers.runInterfaceDefinitionTests(n.interfaces[0], {
            name: "Interface1",
            order: 0,
            extendsTypes: [{ text: "Extend" }],
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
            name: "Interface2",
            order: 1
        });
    });

    describe("#addNamespace()", () => {
        const n = new NamespaceDefinition();
        const returnedDef = n.addNamespace({
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
        });
        n.addNamespace({
            name: "namespace2"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, n.namespaces[0]);
        });

        testHelpers.runNamespaceDefinitionTests(n.namespaces[0], {
            name: "namespace1",
            order: 0,
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
            typeAliases: [{ name: "typeAlias1", type: { text: "string" }}],
            variables: [{ name: "variable1", declarationType: VariableDeclarationType.Let }]
        });
        testHelpers.runNamespaceDefinitionTests(n.namespaces[1], {
            name: "namespace2",
            order: 1,
            declarationType: NamespaceDeclarationType.Namespace // should default to namespace
        });
    });

    describe("#addTypeAlias()", () => {
        const n = new NamespaceDefinition();
        const returnedDef = n.addTypeAlias({
            name: "typeAlias1",
            hasDeclareKeyword: true,
            isAmbient: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isNamedExportOfFile: true,
            type: "string",
            typeParameters: [{ name: "T" }]
        });
        n.addTypeAlias({
            name: "typeAlias2",
            type: "string"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, n.typeAliases[0]);
        });

        testHelpers.runTypeAliasDefinitionTests(n.typeAliases[0], {
            name: "typeAlias1",
            order: 0,
            hasDeclareKeyword: true,
            isAmbient: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isNamedExportOfFile: true,
            type: { text: "string" },
            typeParameters: [{ name: "T" }]
        });
        testHelpers.runTypeAliasDefinitionTests(n.typeAliases[1], {
            name: "typeAlias2",
            order: 1,
            type: { text: "string" }
        });
    });

    describe("#addVariable()", () => {
        const n = new NamespaceDefinition();
        const returnedDef = n.addVariable({
            name: "myVar1",
            declarationType: VariableDeclarationType.Const,
            defaultExpression: "5",
            hasDeclareKeyword: true,
            isAmbient: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isNamedExportOfFile: true,
            type: "number"
        });
        n.addVariable({
            name: "myVar2"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, n.variables[0]);
        });

        testHelpers.runVariableDefinitionTests(n.variables[0], {
            name: "myVar1",
            order: 0,
            declarationType: VariableDeclarationType.Const,
            defaultExpression: { text: "5" },
            hasDeclareKeyword: true,
            isAmbient: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isNamedExportOfFile: true,
            type: { text: "number" }
        });
        testHelpers.runVariableDefinitionTests(n.variables[1], {
            name: "myVar2",
            order: 1,
            declarationType: VariableDeclarationType.Let // should default to let
        });
    });

    describe("#getClass()", () => {
        const n = new NamespaceDefinition();
        n.addClass({ name: "name1" });
        n.addClass({ name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getClass("name2")!, { name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getClass(d => d.name === "name2")!, { name: "name2" });
    });

    describe("#getEnum()", () => {
        const n = new NamespaceDefinition();
        n.addEnum({ name: "name1" });
        n.addEnum({ name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getEnum("name2")!, { name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getEnum(d => d.name === "name2")!, { name: "name2" });
    });

    describe("#getFunction()", () => {
        const n = new NamespaceDefinition();
        n.addFunction({ name: "name1" });
        n.addFunction({ name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getFunction("name2")!, { name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getFunction(d => d.name === "name2")!, { name: "name2" });
    });

    describe("#getInterface()", () => {
        const n = new NamespaceDefinition();
        n.addInterface({ name: "name1" });
        n.addInterface({ name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getInterface("name2")!, { name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getInterface(d => d.name === "name2")!, { name: "name2" });
    });

    describe("#getNamespace()", () => {
        const n = new NamespaceDefinition();
        n.addNamespace({ name: "name1" });
        n.addNamespace({ name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getNamespace("name2")!, { name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getNamespace(d => d.name === "name2")!, { name: "name2" });
    });

    describe("#getTypeAlias()", () => {
        const n = new NamespaceDefinition();
        n.addTypeAlias({ name: "name1", type: "string" });
        n.addTypeAlias({ name: "name2", type: "string" });
        testHelpers.runNamedDefinitionTests(n.getTypeAlias("name2")!, { name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getTypeAlias(d => d.name === "name2")!, { name: "name2" });
    });

    describe("#getVariable()", () => {
        const n = new NamespaceDefinition();
        n.addVariable({ name: "name1" });
        n.addVariable({ name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getVariable("name2")!, { name: "name2" });
        testHelpers.runNamedDefinitionTests(n.getVariable(d => d.name === "name2")!, { name: "name2" });
    });

    describe("#directlyContains()", () => {
        const n = new NamespaceDefinition();
        n.addClass({ name: "c" });
        n.addEnum({ name: "e" });
        n.addFunction({ name: "f" });
        n.addInterface({ name: "i" });
        n.addNamespace({ name: "n" });
        n.addTypeAlias({ name: "t", type: "string" });
        n.addVariable({ name: "v" });

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
        def.addVariable({ name: "v" });
        def.addNamespace({
            name: "n1"
        });
        def.addNamespace({
            name: "n2",
            namespaces: [{
                name: "n3",
                variables: [{ name: "v1" }, { name: "v2" }]
            }]
        });

        describe("getting the namesapces to a variable directly in the namespace", () => {
            const namespaces = def.getNamespacesToDefinition(def.variables[0])!;

            it("the array should have the correct length", () => {
                assert.equal(namespaces.length, 0);
            });
        });

        describe("getting the namesapces to a variable in a namespace within a namespace", () => {
            const namespaces = def.getNamespacesToDefinition(def.namespaces[1].namespaces[0].variables[1])!;

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

    describe("#getExports()", () => {
        const def = createNamespace({
            name: "MyNamespace",
            namespaces: [{ name: "" }, { name: "", isExported: true }, { name: "", isExported: true, isDefaultExportOfFile: true }],
            classes: [{ name: "" }, { name: "", isExported: true }],
            interfaces: [{ name: "" }, { name: "", isExported: true }],
            enums: [{ name: "" }, { name: "", isExported: true }],
            functions: [{ name: "" }, { name: "", isExported: true }],
            variables: [{ name: "" }, { name: "", isExported: true }],
            typeAliases: [{ name: "", type: "" }, { name: "", type: "", isExported: true }]
        });

        describe("it should have 7 exports", () => {
            assert.equal(def.getExports().length, 7);
        });
    });

    describe("#getMembers()", () => {
        const def = createNamespace({
            name: "MyNamespace",
            namespaces: [{ name: "" }],
            classes: [{ name: "" }],
            interfaces: [{ name: "" }],
            enums: [{ name: "" }],
            functions: [{ name: "" }],
            variables: [{ name: "" }],
            typeAliases: [{ name: "", type: "" }]
        });

        describe("it should have 7 members", () => {
            assert.equal(def.getMembers().length, 7);
        });
    });

    describe("#setOrderOfMember()", () => {
        describe("changing the order", () => {
            const def = createNamespace({
                name: "MyNamespace"
            });
            def.addNamespace({ name: "n" });
            def.addClass({ name: "c" });
            def.addInterface({ name: "i" });
            def.addEnum({ name: "e" });
            def.addFunction({ name: "f" });
            def.addVariable({ name: "v" });
            def.addTypeAlias({ name: "t", type: "string" });

            def.setOrderOfMember(1, def.typeAliases[0]);

            testHelpers.runNamespaceDefinitionTests(def, {
                name: "MyNamespace",
                namespaces: [{ name: "n", order: 0 }],
                classes: [{ name: "c", order: 2 }],
                interfaces: [{ name: "i", order: 3 }],
                enums: [{ name: "e", order: 4 }],
                functions: [{ name: "f", order: 5 }],
                variables: [{ name: "v", order: 6 }],
                typeAliases: [{ name: "t", order: 1, type: { text: "string" } }]
            });
        });

        describe("specifying an order less than 0", () => {
            const def = createNamespace({
                name: "MyNamespace"
            });
            def.addNamespace({ name: "n" });
            def.addClass({ name: "c" });

            def.setOrderOfMember(-1, def.classes[0]);

            testHelpers.runNamespaceDefinitionTests(def, {
                name: "MyNamespace",
                namespaces: [{ name: "n", order: 1 }],
                classes: [{ name: "c", order: 0 }]
            });
        });

        describe("providing a member that doesn't exist", () => {
            it("should throw an error", () => {
                const def = createNamespace({ name: "" });
                def.addNamespace({ name: "n" });

                assert.throws(() => {
                    def.setOrderOfMember(0, createNamespace({ name: "n" }));
                }, Error, `The member 'n' does not exist in this module.`);
            });
        });
    });
});
