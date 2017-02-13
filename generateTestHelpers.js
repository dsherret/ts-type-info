// todo: need to figure out why this generates a bit more test helper methods than expected
// todo: improve custom test writing (issue #2 in ts-state-test-generator)

var path = require("path");
var fs = require("fs");
var getInfoFromFiles = require("ts-type-info").getInfoFromFiles;
var TestGenerator = require("ts-state-test-generator").TestGenerator;

const result = getInfoFromFiles([
    path.join(__dirname, "src/definitions.ts")
], {
    showDebugMessages: false,
    compilerOptions: {
        strictNullChecks: true
    }
});
const definitionClasses = [];
result.files.forEach((f) => {
    f.classes.forEach((c) => {
        if (/Definition$/.test(c.name) && c.name !== "NodedDefinition") {
            definitionClasses.push(c);
            c.properties = c.properties.filter(p => p.name[0] !== "_");
        }
    });
});

const generator = new TestGenerator();
generator.addIgnoreTypeTransform(type => type.text === "TypeNode");
generator.addIgnoreTypeTransform(type => type.text === "Node");
generator.addIgnoreTypeTransform(type => type.text === "NodedDefinition");
generator.addIgnorePropertyTransform(prop => prop.name === "tsNode");
generator.addIgnorePropertyTransform(prop => prop.name === "typeChecker");
generator.addIgnorePropertyTransform(prop => prop.name === "onBeforeWrite");
generator.addIgnorePropertyTransform(prop => prop.name === "onAfterWrite");
generator.addIgnorePropertyTransform(prop => prop.name === "onWriteFunctionBody");
generator.addIgnorePropertyTransform(prop => prop.name === "onWriteGetBody");
generator.addIgnorePropertyTransform(prop => prop.name === "onWriteSetBody");
generator.addIgnorePropertyTransform(prop => prop.name === "definitions");
generator.addOptInPropertyTransform(prop => prop.name === "order");
generator.addOptInPropertyTransform(prop => prop.name === "node");
generator.addOptInPropertyTransform((prop, classDef) => prop.name === "expression" && classDef.name === "StarImportPartDefinition");
generator.addOptInPropertyTransform((prop, classDef) => prop.name === "expression" && classDef.name === "NamedImportPartDefinition");
generator.addDefaultValue(prop => prop.name === "intersectionTypes", `[]`);
generator.addDefaultValue(prop => prop.name === "unionTypes", `[]`);
generator.addDefaultValue(prop => prop.name === "properties", `[]`);
generator.addDefaultValue(prop => prop.name === "decorators", `[]`);
generator.addDefaultValue(prop => prop.name === "typeArguments", `[]`);
generator.addDefaultValue(prop => prop.name === "arrayElementType", `null`);
generator.addDefaultValue(prop => prop.name === "thisType", `null`);
generator.addDefaultValue((prop, classDef) => prop.name === "defaultExpression" && classDef.name !== "DefaultExpressionedStructure", `null`);
generator.addDefaultValue(prop => prop.name === "isOptional", `false`);
generator.addDefaultValue(prop => prop.name === "isAbstract", `false`);
generator.addDefaultValue((prop, classDef) => prop.name === "isAmbient" && ["TypeAliasDefinition", "InterfaceDefinition"].indexOf(classDef.name) >= 0, `true`);
generator.addDefaultValue(prop => prop.name === "isAmbient", `false`);
generator.addDefaultValue(prop => prop.name === "hasDeclareKeyword", `false`);
generator.addDefaultValue(prop => prop.name === "isAsync", `false`);
generator.addDefaultValue(prop => prop.name === "isReadonly", `false`);
generator.addDefaultValue(prop => prop.name === "isExported", `false`);
generator.addDefaultValue(prop => prop.name === "isNamedExportOfFile", `false`);
generator.addDefaultValue(prop => prop.name === "isDefaultExportOfFile", `false`);
generator.addDefaultValue(prop => prop.name === "isDecoratorFactory", `false`);
generator.addDefaultValue((prop, classDef) => prop.name === "parameterName" && classDef.name === "UserDefinedTypeGuardDefinition", `"this"`);
generator.addDefaultValue(prop => prop.name === "documentationComment", `""`);
generator.addDefaultValue(prop => prop.name === "parameters", `[]`);
generator.addDefaultValue(prop => prop.name === "returnType", `{ text: "void" }`);
generator.addDefaultValue((prop, classDef) => prop.name === "type" && ["TypeAliasDefinition"].indexOf(classDef.name) >= 0, `{ text: "string" }`);
generator.addDefaultValue((prop, classDef) => prop.name === "type" && classDef.name !== "TypedStructure", `{ text: "any" }`);
generator.addDefaultValue(prop => prop.name === "keyType", `{ text: "string" }`);
generator.addDefaultValue(prop => prop.name === "typeParameters", `[]`);
generator.addDefaultValue(prop => prop.name === "callSignatures", `[]`);
generator.addDefaultValue(prop => prop.name === "constraintType", `null`);
generator.addDefaultValue(prop => prop.name === "arguments", `[]`);
generator.addDefaultValue(prop => prop.name === "isRestParameter", `false`);
generator.addDefaultValue(prop => prop.name === "destructuringProperties", `[]`);
generator.addDefaultValue(prop => prop.name === "overloadSignatures", `[]`);
generator.addDefaultValue(prop => prop.name === "isGenerator", `false`);
generator.addDefaultValue(prop => prop.name === "userDefinedTypeGuard", `null`);
generator.addDefaultValue(prop => prop.name === "isConst", `false`);
generator.addDefaultValue(prop => prop.name === "members", `[]`);
generator.addDefaultValue(prop => prop.name === "scope" && prop.type.text === "Scope", `Scope.Public`);
generator.addDefaultValue(prop => prop.name === "scope" && prop.type.text === "ClassConstructorParameterScope", `ClassConstructorParameterScope.None`);
generator.addDefaultValue(prop => prop.name === "methods", `[]`);
generator.addDefaultValue(prop => prop.name === "extendsTypes", `[]`);
generator.addDefaultValue(prop => prop.name === "implementsTypes", `[]`);
generator.addDefaultValue(prop => prop.name === "newSignatures", `[]`);
generator.addDefaultValue(prop => prop.name === "indexSignatures", `[]`);
generator.addDefaultValue(prop => prop.name === "kind" && prop.type.text === "ClassPropertyKind", `ClassPropertyKind.Normal`);
generator.addDefaultValue(prop => prop.name === "isConstructorParameter", `false`);
generator.addDefaultValue(prop => prop.name === "staticMethods", `[]`);
generator.addDefaultValue(prop => prop.name === "staticProperties", `[]`);
generator.addDefaultValue(prop => prop.name === "constructorDef", `{}`);
generator.addDefaultValue(prop => prop.name === "declarationType" && prop.type.text === "VariableDeclarationType", `VariableDeclarationType.Let`);
generator.addDefaultValue(prop => prop.name === "declarationType" && prop.type.text === "NamespaceDeclarationType", `NamespaceDeclarationType.Namespace`);
generator.addDefaultValue(prop => prop.name === "namespaces", `[]`);
generator.addDefaultValue(prop => prop.name === "classes", `[]`);
generator.addDefaultValue(prop => prop.name === "interfaces", `[]`);
generator.addDefaultValue(prop => prop.name === "enums", `[]`);
generator.addDefaultValue(prop => prop.name === "functions", `[]`);
generator.addDefaultValue(prop => prop.name === "variables", `[]`);
generator.addDefaultValue(prop => prop.name === "typeAliases", `[]`);
generator.addDefaultValue(prop => prop.name === "alias", `null`);
generator.addDefaultValue(prop => prop.name === "imports", `[]`);
generator.addDefaultValue(prop => prop.name === "reExports", `[]`);
generator.addDefaultValue(prop => prop.name === "starExports", `[]`);
generator.addDefaultValue(prop => prop.name === "namedExports", `[]`);
generator.addDefaultValue(prop => prop.name === "starImports", `[]`);
generator.addDefaultValue(prop => prop.name === "namedImports", `[]`);
generator.addDefaultValue(prop => prop.name === "defaultImport", `null`);
generator.addDefaultValue(prop => prop.name === "defaultExportExpression", `null`);
generator.addDefaultValue(prop => prop.name === "files", `[]`);
generator.addDefaultValue(prop => prop.name === "starImportName", `null`);
generator.addDefaultValue((prop, def) => prop.name === "expression" && def.name === "DefaultImportPartDefinition", `null`);
generator.addDefaultValue(prop => prop.name === "fileName", `""`);
generator.addPropertyTransform(prop => prop.name === "fileName",
    prop => { },
    writer => {
        writer.writeLine("this.assertions.strictEqual(actualValue.substr(actualValue.length - expectedValue!.length), expectedValue)");
    }, "should end with the same text");

// todo: transform to test function return value so this isn't necessary
generator.addTestStructureTransform(
    def => def.name === "CallSignatureDefinition",
    structure => structure.addProperty({ name: "minArgumentCount", isOptional: true, type: "number" }));
generator.addCustomTestTransform(
    def => def.name === "CallSignatureDefinition",
    writer => {
        writer.write(`this.assertions.describe("#getMinArgumentCount()", () => `).inlineBlock(() => {
            writer.writeLine("let actualValue = actual.getMinArgumentCount();")
            writer.writeLine("let expectedValue = expected.minArgumentCount || 0;")
            writer.write(`this.assertions.it("should have the same value", () => `).inlineBlock(() => {
                writer.writeLine("this.assertions.strictEqual(actualValue, expectedValue);");
            }).write(");");
        }).write(");").newLine();
    }
);

generator.addTestStructureTransform(
    def => def.name === "BaseTypeDefinition",
    structure => structure.addProperty({ name: "isArrayType", isOptional: true, type: "boolean" }));
generator.addCustomTestTransform(
    def => def.name === "BaseTypeDefinition",
    writer => {
        writer.write(`this.assertions.describe("#isArrayType()", () => `).inlineBlock(() => {
            writer.writeLine("let actualValue = actual.isArrayType();")
            writer.writeLine("let expectedValue = expected.isArrayType || false;")
            writer.write(`this.assertions.it("should have the same value", () => `).inlineBlock(() => {
                writer.writeLine("this.assertions.strictEqual(actualValue, expectedValue);");
            }).write(");");
        }).write(");").newLine();
    }
);

generator.addTestStructureTransform(
    def => def.name === "BaseTypeDefinition" || def.name === "StarImportPartDefinition" || def.name === "NamedImportPartDefinition" || def.name === "DefaultImportPartDefinition",
    structure => structure.addProperty({ name: "definitions", isOptional: true, type: "{ name: string; type?: any; }[]" }));
generator.addCustomTestTransform(
    def => def.name === "BaseTypeDefinition" || def.name === "StarImportPartDefinition" || def.name === "NamedImportPartDefinition" || def.name === "DefaultImportPartDefinition",
    writer => {
        writer.write("if (expected.definitions != null)").block(() => {
            writer.write(`this.assertions.describe("#definitions", () => `).inlineBlock(() => {
                writer.writeLine("let actualDefinitions = actual.definitions;")
                writer.writeLine("let expectedDefinitions = expected.definitions!;")
                writer.write("for (let i = 0; i < actualDefinitions.length; i++)").block(() => {
                    writer.write(`this.assertions.it("should have the same value", () => `).inlineBlock(() => {
                        writer.writeLine("this.assertions.strictEqual(actualDefinitions[i].name, expectedDefinitions[i].name);")
                    }).write(");").newLine();
                    writer.write("if (expectedDefinitions[i].type != null)").block(() => {
                        writer.write(`this.assertions.it("should be an instance of the correct type", () => `).inlineBlock(() => {
                            writer.writeLine("this.assertions.strictEqual(actualDefinitions[i] instanceof expectedDefinitions[i].type, true);")
                        }).write(");").newLine();
                    });
                });
            }).write(");").newLine();
        });
    }
);

generator.addTestStructureTransform(
    def => def.name === "BaseTypeDefinition",
    structure => structure.addProperty({ name: "allDefinitions", isOptional: true, type: "{ name: string; }[]" }));
generator.addCustomTestTransform(
    def => def.name === "BaseTypeDefinition",
    writer => {
        writer.write("if (expected.allDefinitions != null)").block(() => {
            writer.write(`this.assertions.describe("#allDefinitions", () => `).inlineBlock(() => {
                writer.writeLine("let actualDefinitions = actual.getAllDefinitions();")
                writer.writeLine("let expectedDefinitions = expected.allDefinitions!;")
                writer.write("for (let i = 0; i < actualDefinitions.length; i++)").block(() => {
                    writer.write(`this.assertions.it("should have the same value", () => `).inlineBlock(() => {
                        writer.writeLine("this.assertions.strictEqual(actualDefinitions[i].name, expectedDefinitions[i].name);")
                    }).write(");");
                });
            }).write(");").newLine();
        });
    }
);

generator.addTestStructureTransform(
    def => def.name === "ModuledDefinition",
    structure => structure.addProperty({ name: "exports", isOptional: true, type: "{ name: string; }[]" }));
generator.addCustomTestTransform(
    def => def.name === "ModuledDefinition",
    writer => {
        writer.write(`this.assertions.describe("#getExports()", () => `).inlineBlock(() => {
            writer.writeLine("let actualExports = actual.getExports();")
            writer.writeLine("let expectedExports = expected.exports!;")
            writer.write("for (let i = 0; i < actualExports.length; i++)").block(() => {
                writer.write(`this.assertions.it("should have the same value", () => `).inlineBlock(() => {
                    writer.writeLine("this.assertions.strictEqual(actualExports[i].name, expectedExports[i].name);")
                }).write(");").newLine();
            });
        }).write(");").newLine();
    }
);

generator.addTestStructureTransform(
    def => def.name === "BaseDefinition",
    structure => {
        structure.addProperty({ name: "hasOnBeforeWrite", isOptional: true, type: "boolean" });
        structure.addProperty({ name: "hasOnAfterWrite", isOptional: true, type: "boolean" });
    });
generator.addCustomTestTransform(
    def => def.name === "BaseDefinition",
    writer => {
        // todo: reduce duplication
        writer.write(`this.assertions.describe("hasOnBeforeWrite", () => `).inlineBlock(() => {
            writer.writeLine(`let actualValue = typeof actual.onBeforeWrite === "function";`)
            writer.writeLine("let expectedValue = expected.hasOnBeforeWrite || false;")
            writer.write(`this.assertions.it("should have the same value", () => `).inlineBlock(() => {
                writer.writeLine("this.assertions.strictEqual(actualValue, expectedValue);");
            }).write(");");
        }).write(");").newLine();
        writer.write(`this.assertions.describe("hasOnAfterWrite", () => `).inlineBlock(() => {
            writer.writeLine(`let actualValue = typeof actual.onAfterWrite === "function";`)
            writer.writeLine("let expectedValue = expected.hasOnAfterWrite || false;")
            writer.write(`this.assertions.it("should have the same value", () => `).inlineBlock(() => {
                writer.writeLine("this.assertions.strictEqual(actualValue, expectedValue);");
            }).write(");");
        }).write(");").newLine();
    }
);

generator.addTestStructureTransform(
    def => def.name === "ClassPropertyDefinition",
    structure => {
        structure.addProperty({ name: "hasOnWriteGetBody", isOptional: true, type: "boolean" });
        structure.addProperty({ name: "hasOnWriteSetBody", isOptional: true, type: "boolean" });
    });
generator.addCustomTestTransform(
    def => def.name === "ClassPropertyDefinition",
    writer => {
        // todo: reduce duplication
        writer.write(`this.assertions.describe("hasOnWriteGetBody", () => `).inlineBlock(() => {
            writer.writeLine(`let actualValue = typeof actual.onWriteGetBody === "function";`)
            writer.writeLine("let expectedValue = expected.hasOnWriteGetBody || false;")
            writer.write(`this.assertions.it("should have the same value", () => `).inlineBlock(() => {
                writer.writeLine("this.assertions.strictEqual(actualValue, expectedValue);");
            }).write(");");
        }).write(");").newLine();
        writer.write(`this.assertions.describe("hasOnWriteSetBody", () => `).inlineBlock(() => {
            writer.writeLine(`let actualValue = typeof actual.onWriteSetBody === "function";`)
            writer.writeLine("let expectedValue = expected.hasOnWriteSetBody || false;")
            writer.write(`this.assertions.it("should have the same value", () => `).inlineBlock(() => {
                writer.writeLine("this.assertions.strictEqual(actualValue, expectedValue);");
            }).write(");");
        }).write(");").newLine();
    }
);

// todo: the library should handle this on FunctionBodyWriteableDefinition somehow (lots of considerations needed)
const functionBodyWriteableDefinitions = ["FunctionDefinition", "ClassConstructorDefinition", "BaseClassMethodDefinition"];
generator.addTestStructureTransform(
    def => functionBodyWriteableDefinitions.indexOf(def.name) >= 0,
    structure => {
        structure.addProperty({ name: "hasOnWriteFunctionBody", isOptional: true, type: "boolean" });
    });
generator.addCustomTestTransform(
    def => functionBodyWriteableDefinitions.indexOf(def.name) >= 0,
    writer => {
        writer.write(`this.assertions.describe("hasOnWriteFunctionBody", () => `).inlineBlock(() => {
            writer.writeLine(`let actualValue = typeof actual.onWriteFunctionBody === "function";`)
            writer.writeLine("let expectedValue = expected.hasOnWriteFunctionBody || false;")
            writer.write(`this.assertions.it("should have the same value", () => `).inlineBlock(() => {
                writer.writeLine("this.assertions.strictEqual(actualValue, expectedValue);");
            }).write(");");
        }).write(");").newLine();
    }
);

const testFile = generator.getTestFile(definitionClasses);
const definitionNamedImportNames = definitionClasses.map(c => c.name);
definitionNamedImportNames.push( "VariableDeclarationType", "Scope", "ClassConstructorParameterScope", "ExportableDefinitions", "ClassPropertyKind",
    "NamespaceDeclarationType", "ModuleMemberDefinitions");

testFile.addImport({
    namedImports: definitionNamedImportNames.map(name => ({ name })),
    moduleSpecifier: "./../../definitions"
});

const structureNamedImportNames = [];
structureNamedImportNames.push("FunctionParameterStructure", "ClassStaticMethodParameterStructure", "ClassMethodParameterStructure", "InterfaceMethodParameterStructure",
    "BaseParameterStructure", "BaseClassMethodParameterStructure", "ObjectPropertyStructure", "BaseStructure", "OptionallyNamedStructure", "OptionalStructure",
    "TypedStructure", "DefaultExpressionedStructure", "DecoratableStructure", "BaseObjectPropertyStructure", "DecoratorStructure", "BasePropertyStructure", "NamedStructure",
    "ReadonlyableStructure");

testFile.addImport({
    namedImports: structureNamedImportNames.map(name => ({ name })),
    moduleSpecifier: "./../../structures"
});

testFile.onBeforeWrite = writer => {
    writer
        .writeLine("/* tslint:disable */")
        .writeLine("/*")
        .writeLine("******************************************************************")
        .writeLine("* AUTO GENERATED CODE BY generateTestHelpers.js -- DO NOT EDIT!! *")
        .writeLine("******************************************************************")
        .writeLine("*/")
        .newLine();
};

fs.writeFile(path.join(__dirname, "src/tests/testHelpers/generatedTestHelpers.ts"), testFile.write());
