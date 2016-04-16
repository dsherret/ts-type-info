import * as assert from "assert";
import * as path from "path";
import {VariableDeclarationType} from "./../definitions";
import * as tsTypeInfo from "./../main";
import {ArgumentTypeError, FileNotFoundError} from "./../errors";
import {runFileDefinitionTests} from "./testHelpers";

describe("Main", () => {
    describe("#createFile()", () => {
        const file = tsTypeInfo.createFile({
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
            variables: [{ name: "myVar", declarationType: VariableDeclarationType.Let }]
        });
    });

    describe("#getInfoFromFiles()", () => {
        it("should throw an error when not providing an array", () => {
            assert.throws(() => tsTypeInfo.getInfoFromFiles("" as any), ArgumentTypeError);
        });

        it("should not handle a non ts file when specifying not to allow them", () => {
            const result = tsTypeInfo.getInfoFromFiles([path.join(__dirname, "../../src/tests/testFiles/nonTsFile.txt")], {
                compilerOptions: { allowNonTsExtensions: false }
            });
            assert.equal(result.length, 0);
        });

        it("should get the class definition when specifying the compiler option to allow non ts extensions", () => {
            const result = tsTypeInfo.getInfoFromFiles([path.join(__dirname, "../../src/tests/testFiles/nonTsFile.txt")], {
                compilerOptions: { allowNonTsExtensions: true }
            });
            assert.equal(result[0].classes[0].name, "MyClass");
        });

        it("should throw an error when a file isn't found", () => {
            assert.throws(() => {
                tsTypeInfo.getInfoFromFiles(["nonExistentFile.txt"]);
            }, FileNotFoundError, "File not found: nonExistentFile.txt");
        });
    });

    describe("#getInfoFromString()", () => {
        it("should throw an error when not providing a string", () => {
            assert.throws(() => tsTypeInfo.getInfoFromString([] as any), ArgumentTypeError);
        });

        it("should allow changing the compiler options", () => {
            const result = tsTypeInfo.getInfoFromString("class MyClass {}\n\n", { });
            assert.equal(result.classes[0].name, "MyClass");
        });
    });
});
