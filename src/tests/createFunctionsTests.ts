import * as createFunctions from "./../createFunctions";
import * as testHelpers from "./testHelpers";

describe("createFunctions", () => {
    describe("createCallSignature()", () => {
        testHelpers.runCallSignatureDefinitionTests(createFunctions.createCallSignature(), {});
        testHelpers.runCallSignatureDefinitionTests(createFunctions.createCallSignature({}), {});
    });

    describe("createCallSignatureParameter()", () => {
        testHelpers.runCallSignatureParameterDefinitionTests(createFunctions.createCallSignatureParameter({ name: "name" }), { name: "name" });
    });

    describe("createClass()", () => {
        testHelpers.runClassDefinitionTests(createFunctions.createClass({ name: "name" }), { name: "name" });
    });

    describe("createClassConstructor()", () => {
        testHelpers.runClassConstructorDefinitionTests(createFunctions.createClassConstructor(), {});
        testHelpers.runClassConstructorDefinitionTests(createFunctions.createClassConstructor({}), {});
    });

    describe("createClassConstructorParameter()", () => {
        testHelpers.runClassConstructorParameterDefinitionTests(createFunctions.createClassConstructorParameter({ name: "name" }), { name: "name" });
    });

    describe("createClassMethod()", () => {
        testHelpers.runClassMethodDefinitionTests(createFunctions.createClassMethod({ name: "name" }), { name: "name" });
    });

    describe("createClassMethodParameter()", () => {
        testHelpers.runClassMethodParameterDefinitionTests(createFunctions.createClassMethodParameter({ name: "name" }), { name: "name" });
    });

    describe("createClassProperty()", () => {
        testHelpers.runClassPropertyDefinitionTests(createFunctions.createClassProperty({ name: "name" }), { name: "name" });
    });

    describe("createClassStaticMethod()", () => {
        testHelpers.runClassStaticMethodDefinitionTests(createFunctions.createClassStaticMethod({ name: "name" }), { name: "name" });
    });

    describe("createClassStaticMethodParameter()", () => {
        testHelpers.runClassStaticMethodParameterDefinitionTests(createFunctions.createClassStaticMethodParameter({ name: "name" }), { name: "name" });
    });

    describe("createClassStaticProperty()", () => {
        testHelpers.runClassStaticPropertyDefinitionTests(createFunctions.createClassStaticProperty({ name: "name" }), { name: "name" });
    });

    describe("createDecorator()", () => {
        testHelpers.runDecoratorDefinitionTests(createFunctions.createDecorator({ name: "name" }), { name: "name" });
    });

    describe("createEnum()", () => {
        testHelpers.runEnumDefinitionTests(createFunctions.createEnum({ name: "name" }), { name: "name" });
    });

    describe("createEnumMember()", () => {
        testHelpers.runEnumMemberDefinitionTests(createFunctions.createEnumMember({ name: "name", value: 0 }), { name: "name", value: 0 });
    });

    describe("createFile()", () => {
        describe("has options", () => {
            const file = createFunctions.createFile({
                fileName: "test.ts",
                defaultExportExpression: "5",
                imports: [{ moduleSpecifier: "./test", starImportName: "test" }],
                reExports: [{ moduleSpecifier: "./test2" }],
                variables: [{ name: "myVar" }]
            });

            testHelpers.runFileDefinitionTests(file, {
                fileName: "test.ts",
                defaultExportExpression: { text: "5" },
                imports: [{ moduleSpecifier: "./test", starImportName: "test" }],
                reExports: [{ moduleSpecifier: "./test2" }],
                variables: [{ name: "myVar" }]
            });
        });

        describe("has no options", () => {
            const file = createFunctions.createFile();

            testHelpers.runFileDefinitionTests(file, {});
        });
    });

    describe("createFunction()", () => {
        testHelpers.runFunctionDefinitionTests(createFunctions.createFunction({ name: "name" }), { name: "name" });
    });

    describe("createFunctionParameter()", () => {
        testHelpers.runFunctionParameterDefinitionTests(createFunctions.createFunctionParameter({ name: "name" }), { name: "name" });
    });

    describe("createImport()", () => {
        testHelpers.runImportDefinitionTests(createFunctions.createImport({ moduleSpecifier: "test" }), { moduleSpecifier: "test" });
    });

    describe("createIndexSignature()", () => {
        testHelpers.runIndexSignatureDefinitionTests(
            createFunctions.createIndexSignature({ keyName: "t", keyType: "string", returnType: "any" }),
            { keyName: "t", keyType: { text: "string" }, returnType: { text: "any" } }
        );
    });

    describe("createInterface()", () => {
        testHelpers.runInterfaceDefinitionTests(createFunctions.createInterface({ name: "name" }), { name: "name" });
    });

    describe("createInterfaceMethod()", () => {
        testHelpers.runInterfaceMethodDefinitionTests(createFunctions.createInterfaceMethod({ name: "name" }), { name: "name" });
    });

    describe("createInterfaceMethodParameterStructure()", () => {
        testHelpers.runInterfaceMethodParameterDefinitionTests(createFunctions.createInterfaceMethodParameter({ name: "name" }), { name: "name" });
    });

    describe("createInterfaceProperty()", () => {
        testHelpers.runInterfacePropertyDefinitionTests(createFunctions.createInterfaceProperty({ name: "name" }), { name: "name" });
    });

    describe("createNamespace()", () => {
        testHelpers.runNamespaceDefinitionTests(
            createFunctions.createNamespace({ name: "name" }),
            { name: "name" }
        );
    });

    describe("createReExport()", () => {
        testHelpers.runReExportDefinitionTests(createFunctions.createReExport({ moduleSpecifier: "name" }), { moduleSpecifier: "name" });
    });

    describe("createTypeAlias()", () => {
        testHelpers.runTypeAliasDefinitionTests(
            createFunctions.createTypeAlias({ name: "name", type: "string" }),
            { name: "name", type: { text: "string" } }
        );
    });

    describe("createVariable()", () => {
        testHelpers.runVariableDefinitionTests(createFunctions.createVariable({ name: "name" }), { name: "name" });
    });
});
