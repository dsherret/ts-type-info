var path = require("path");
var fs = require("fs");
var getInfoFromFiles = require("ts-type-info").getInfoFromFiles;
var CloneableGenerator = require("ts-cloneable-generator").CloneableGenerator;

const result = getInfoFromFiles([
    path.join(__dirname, "src/definitions/expression/TypeDefinition.ts")
], {
    showDebugMessages: false,
    compilerOptions: {
        strictNullChecks: true
    }
});
const file = result.getFile("TypeDefinition.ts");
const definitionClasses = file.classes;

const generator = new CloneableGenerator();
const testFile = generator.getGeneratedFile(definitionClasses);
const definitionNamedImportNames = definitionClasses.map(c=> c.name);
definitionNamedImportNames.push("BaseTypeDefinition", "BaseExpressionDefinition", "BaseDefinition")

testFile.addImport({
    namedImports: definitionNamedImportNames.map(name => ({ name })),
    moduleSpecifier: "./definitions"
});

testFile.onBeforeWrite = writer => {
    writer
        .writeLine("/* tslint:disable */")
        .writeLine("/*")
        .writeLine("*************************************************************************")
        .writeLine("* AUTO GENERATED CODE BY generateCloneFunctions.js -- DO NOT EDIT!! *")
        .writeLine("*************************************************************************")
        .writeLine("*/")
        .newLine();
};

fs.writeFile(path.join(__dirname, "src/cloneFunctions.ts"), testFile.write());
