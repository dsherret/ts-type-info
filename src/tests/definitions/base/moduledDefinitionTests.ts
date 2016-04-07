import {NamespaceDefinition, VariableDeclarationType} from "./../../../definitions";
import {runClassDefinitionTests, runEnumDefinitionTests, runFunctionDefinitionTests, runInterfaceDefinitionTests, runTypeAliasDefinitionTests,
    runVariableDefinitionTests} from "./../../testHelpers";

describe("ModuledDefinitionTests", () => {
    describe("addEnums", () => {
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
            isDefaultExportOfFile: true,
            isExported: true,
            isNamedExportOfFile: true,
            parameters: [{ name: "param1" }, { name: "param2" }],
            returnType: "string",
            typeParameters: [{ name: "T" }, { name: "U" }]
        }, {
            name: "function2"
        });

        runFunctionDefinitionTests(n.functions[0], {
            name: "function1",
            hasDeclareKeyword: true,
            isAmbient: true,
            isDefaultExportOfFile: true,
            isExported: true,
            isNamedExportOfFile: true,
            parameters: [{ name: "param1" }, { name: "param2" }],
            returnTypeExpression: { text: "string" },
            typeParameters: [{ name: "T" }, { name: "U" }]
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
        runInterfaceDefinitionTests(n.interfaces[1], {
            name: "Interface2"
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
});
