import {NamespaceDefinition, NamespaceDeclarationType, VariableDeclarationType} from "./../../../definitions";
import {runClassDefinitionTests, runEnumDefinitionTests, runFunctionDefinitionTests, runInterfaceDefinitionTests, runNamedDefinitionTests,
    runNamespaceDefinitionTests, runTypeAliasDefinitionTests, runVariableDefinitionTests} from "./../../testHelpers";

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

        runClassDefinitionTests(n.classes[0], {
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
        runClassDefinitionTests(n.classes[1], {
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

        runEnumDefinitionTests(n.enums[0], {
            name: "enum1",
            hasDeclareKeyword: true,
            isAmbient: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isNamedExportOfFile: true,
            members: [{ name: "member1", value: 1 }, { name: "member2", value: 2 }]
        });
        runEnumDefinitionTests(n.enums[1], {
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

        runFunctionDefinitionTests(n.functions[0], {
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
        runFunctionDefinitionTests(n.functions[1], {
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

        runInterfaceDefinitionTests(n.interfaces[0], {
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
        runInterfaceDefinitionTests(n.interfaces[1], {
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

        runNamespaceDefinitionTests(n.namespaces[0], {
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
        runNamespaceDefinitionTests(n.namespaces[1], {
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

        runTypeAliasDefinitionTests(n.typeAliases[0], {
            name: "typeAlias1",
            hasDeclareKeyword: true,
            isAmbient: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isNamedExportOfFile: true,
            typeExpression: { text: "string" },
            typeParameters: [{ name: "T" }]
        });
        runTypeAliasDefinitionTests(n.typeAliases[1], {
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

        runVariableDefinitionTests(n.variables[0], {
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
        runVariableDefinitionTests(n.variables[1], {
            name: "myVar2",
            declarationType: VariableDeclarationType.Let // should default to let
        });
    });

    describe("getClass", () => {
        const n = new NamespaceDefinition();
        n.addClasses({ name: "name1" }, { name: "name2" });
        runNamedDefinitionTests(n.getClass("name2"), { name: "name2" });
        runNamedDefinitionTests(n.getClass(d => d.name === "name2"), { name: "name2" });
    });

    describe("getEnum", () => {
        const n = new NamespaceDefinition();
        n.addEnums({ name: "name1" }, { name: "name2" });
        runNamedDefinitionTests(n.getEnum("name2"), { name: "name2" });
        runNamedDefinitionTests(n.getEnum(d => d.name === "name2"), { name: "name2" });
    });

    describe("getFunction", () => {
        const n = new NamespaceDefinition();
        n.addFunctions({ name: "name1" }, { name: "name2" });
        runNamedDefinitionTests(n.getFunction("name2"), { name: "name2" });
        runNamedDefinitionTests(n.getFunction(d => d.name === "name2"), { name: "name2" });
    });

    describe("getInterface", () => {
        const n = new NamespaceDefinition();
        n.addInterfaces({ name: "name1" }, { name: "name2" });
        runNamedDefinitionTests(n.getInterface("name2"), { name: "name2" });
        runNamedDefinitionTests(n.getInterface(d => d.name === "name2"), { name: "name2" });
    });

    describe("getNamespace", () => {
        const n = new NamespaceDefinition();
        n.addNamespaces({ name: "name1" }, { name: "name2" });
        runNamedDefinitionTests(n.getNamespace("name2"), { name: "name2" });
        runNamedDefinitionTests(n.getNamespace(d => d.name === "name2"), { name: "name2" });
    });

    describe("getTypeAlias", () => {
        const n = new NamespaceDefinition();
        n.addTypeAliases({ name: "name1", type: "string" }, { name: "name2", type: "string" });
        runNamedDefinitionTests(n.getTypeAlias("name2"), { name: "name2" });
        runNamedDefinitionTests(n.getTypeAlias(d => d.name === "name2"), { name: "name2" });
    });

    describe("getVariable", () => {
        const n = new NamespaceDefinition();
        n.addVariables({ name: "name1" }, { name: "name2" });
        runNamedDefinitionTests(n.getVariable("name2"), { name: "name2" });
        runNamedDefinitionTests(n.getVariable(d => d.name === "name2"), { name: "name2" });
    });
});
