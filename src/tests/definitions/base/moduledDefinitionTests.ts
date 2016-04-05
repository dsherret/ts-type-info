import {NamespaceDefinition} from "./../../../definitions";
import {runInterfaceDefinitionTests, runTypeAliasDefinitionTests} from "./../../testHelpers";

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
});
