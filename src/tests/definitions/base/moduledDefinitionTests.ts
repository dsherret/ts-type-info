import {NamespaceDefinition, VariableDeclarationType} from "./../../../definitions";
import {runInterfaceDefinitionTests, runTypeAliasDefinitionTests, runVariableDefinitionTests} from "./../../testHelpers";

describe("ModuledDefinitionTests", () => {
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
