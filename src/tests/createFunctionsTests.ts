import * as createFunctions from "./../createFunctions";
import {runCallSignatureDefinitionTests, runCallSignatureParameterDefinitionTests, runClassDefinitionTests, runClassConstructorDefinitionTests,
    runClassConstructorParameterDefinitionTests, runClassMethodDefinitionTests, runClassMethodParameterDefinitionTests, runClassPropertyDefinitionTests,
    runClassStaticMethodDefinitionTests, runClassStaticMethodParameterDefinitionTests, runClassStaticPropertyDefinitionTests, runDecoratorDefinitionTests, runEnumDefinitionTests,
    runEnumMemberDefinitionTests, runFileDefinitionTests, runFunctionDefinitionTests, runFunctionParameterDefinitionTests, runImportDefinitionTests,
    runIndexSignatureDefinitionTests, runInterfaceDefinitionTests, runInterfaceMethodDefinitionTests, runInterfaceMethodParameterDefinitionTests,
    runInterfacePropertyDefinitionTests, runNamespaceDefinitionTests, runReExportDefinitionTests, runTypeAliasDefinitionTests, runVariableDefinitionTests} from "./testHelpers";

describe("createFunctions", () => {
    describe("createCallSignature()", () => {
        runCallSignatureDefinitionTests(createFunctions.createCallSignature(), {});
        runCallSignatureDefinitionTests(createFunctions.createCallSignature({}), {});
    });

    describe("createCallSignatureParameter()", () => {
        runCallSignatureParameterDefinitionTests(createFunctions.createCallSignatureParameter({ name: "name" }), { name: "name" });
    });

    describe("createClass()", () => {
        runClassDefinitionTests(createFunctions.createClass({ name: "name" }), { name: "name" });
    });

    describe("createClassConstructor()", () => {
        runClassConstructorDefinitionTests(createFunctions.createClassConstructor(), {});
        runClassConstructorDefinitionTests(createFunctions.createClassConstructor({}), {});
    });

    describe("createClassConstructorParameter()", () => {
        runClassConstructorParameterDefinitionTests(createFunctions.createClassConstructorParameter({ name: "name" }), { name: "name" });
    });

    describe("createClassMethod()", () => {
        runClassMethodDefinitionTests(createFunctions.createClassMethod({ name: "name" }), { name: "name" });
    });

    describe("createClassMethodParameter()", () => {
        runClassMethodParameterDefinitionTests(createFunctions.createClassMethodParameter({ name: "name" }), { name: "name" });
    });

    describe("createClassProperty()", () => {
        runClassPropertyDefinitionTests(createFunctions.createClassProperty({ name: "name" }), { name: "name" });
    });

    describe("createClassStaticMethod()", () => {
        runClassStaticMethodDefinitionTests(createFunctions.createClassStaticMethod({ name: "name" }), { name: "name" });
    });

    describe("createClassStaticMethodParameter()", () => {
        runClassStaticMethodParameterDefinitionTests(createFunctions.createClassStaticMethodParameter({ name: "name" }), { name: "name" });
    });

    describe("createClassStaticProperty()", () => {
        runClassStaticPropertyDefinitionTests(createFunctions.createClassStaticProperty({ name: "name" }), { name: "name" });
    });

    describe("createDecorator()", () => {
        runDecoratorDefinitionTests(createFunctions.createDecorator({ name: "name" }), { name: "name" });
    });

    describe("createEnum()", () => {
        runEnumDefinitionTests(createFunctions.createEnum({ name: "name" }), { name: "name" });
    });

    describe("createEnumMember()", () => {
        runEnumMemberDefinitionTests(createFunctions.createEnumMember({ name: "name", value: 0 }), { name: "name", value: 0 });
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

            runFileDefinitionTests(file, {
                fileName: "test.ts",
                defaultExportExpression: { text: "5" },
                imports: [{ moduleSpecifier: "./test", starImportName: "test" }],
                reExports: [{ moduleSpecifier: "./test2" }],
                variables: [{ name: "myVar" }]
            });
        });

        describe("has no options", () => {
            const file = createFunctions.createFile();

            runFileDefinitionTests(file, {});
        });
    });

    describe("createFunction()", () => {
        runFunctionDefinitionTests(createFunctions.createFunction({ name: "name" }), { name: "name" });
    });

    describe("createFunctionParameter()", () => {
        runFunctionParameterDefinitionTests(createFunctions.createFunctionParameter({ name: "name" }), { name: "name" });
    });

    describe("createImport()", () => {
        runImportDefinitionTests(createFunctions.createImport({ moduleSpecifier: "test" }), { moduleSpecifier: "test" });
    });

    describe("createIndexSignature()", () => {
        runIndexSignatureDefinitionTests(
            createFunctions.createIndexSignature({ keyName: "t", keyType: "string", returnType: "any" }),
            { keyName: "t", keyTypeExpression: { text: "string" }, returnTypeExpression: { text: "any" } }
        );
    });

    describe("createInterface()", () => {
        runInterfaceDefinitionTests(createFunctions.createInterface({ name: "name" }), { name: "name" });
    });

    describe("createInterfaceMethod()", () => {
        runInterfaceMethodDefinitionTests(createFunctions.createInterfaceMethod({ name: "name" }), { name: "name" });
    });

    describe("createInterfaceMethodParameterStructure()", () => {
        runInterfaceMethodParameterDefinitionTests(createFunctions.createInterfaceMethodParameter({ name: "name" }), { name: "name" });
    });

    describe("createInterfaceProperty()", () => {
        runInterfacePropertyDefinitionTests(createFunctions.createInterfaceProperty({ name: "name" }), { name: "name" });
    });

    describe("createNamespace()", () => {
        runNamespaceDefinitionTests(
            createFunctions.createNamespace({ name: "name" }),
            { name: "name" }
        );
    });

    describe("createReExport()", () => {
        runReExportDefinitionTests(createFunctions.createReExport({ moduleSpecifier: "name" }), { moduleSpecifier: "name" });
    });

    describe("createTypeAlias()", () => {
        runTypeAliasDefinitionTests(
            createFunctions.createTypeAlias({ name: "name", type: "string" }),
            { name: "name", typeExpression: { text: "string" } }
        );
    });

    describe("createVariable()", () => {
        runVariableDefinitionTests(createFunctions.createVariable({ name: "name" }), { name: "name" });
    });
});
