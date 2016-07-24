import * as assert from "assert";
import {FileDefinition} from "./../../../definitions";
import {createFile} from "./../../../createFunctions";
import {runImportDefinitionTests, runReExportDefinitionTests} from "./../../testHelpers";

describe("FileDefinition", () => {
    describe("#addImport()", () => {
        describe("multiple imports", () => {
            const f = new FileDefinition();
            const returnedDef = f.addImport({
                moduleSpecifier: "./test1",
                starImportName: "myStarImport1"
            });
            f.addImport({
                moduleSpecifier: "./test2",
                defaultImportName: "defaultImport1"
            });
            f.addImport({
                moduleSpecifier: "./test3",
                namedImports: [{
                    name: "namedImport1"
                }]
            });
            f.addImport({
                moduleSpecifier: "./test4",
                namedImports: [{
                    name: "namedImport3"
                }],
                defaultImportName: "defaultImport2"
            });
            f.addImport({
                moduleSpecifier: "./test5"
            });

            it("the returned definition should be in the array", () => {
                assert.equal(returnedDef, f.imports[0]);
            });

            describe("import star", () => {
                runImportDefinitionTests(f.imports[0], {
                    moduleSpecifier: "./test1",
                    starImportName: "myStarImport1"
                });
            });

            describe("default import", () => {
                runImportDefinitionTests(f.imports[1], {
                    moduleSpecifier: "./test2",
                    defaultImport: { importName: "defaultImport1" }
                });
            });

            describe("named import", () => {
                runImportDefinitionTests(f.imports[2], {
                    moduleSpecifier: "./test3",
                    namedImports: [{
                        importName: "namedImport1",
                        definitions: [{
                            name: "namedImport1",
                            type: null
                        }]
                    }]
                });
            });

            describe("named import with default import", () => {
                runImportDefinitionTests(f.imports[3], {
                    moduleSpecifier: "./test4",
                    defaultImport: { importName: "defaultImport2" },
                    namedImports: [{
                        importName: "namedImport3",
                        definitions: [{
                            name: "namedImport3",
                            type: null
                        }]
                    }]
                });
            });

            describe("only module specifier", () => {
                runImportDefinitionTests(f.imports[4], {
                    moduleSpecifier: "./test5"
                });
            });
        });

        it("should error when a star import and named import are specified", () => {
            const f = new FileDefinition();
            assert.throws(() => {
                f.addImport({
                    moduleSpecifier: "./test1",
                    starImportName: "test",
                    namedImports: [{ name: "test2" }]
                });
            }, /specify namedImports/);
        });
    });

    describe("#addReExport()", () => {
        const f = new FileDefinition();
        const returnedDef = f.addReExport({
            moduleSpecifier: "./test1"
        });
        f.addReExport({
            moduleSpecifier: "./test2",
            namedExports: [
                { name: "namedImport1", alias: "aliasName" },
                { name: "namedImport2" }
            ]
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, f.reExports[0]);
        });

        describe("import star", () => {
            runReExportDefinitionTests(f.reExports[0], {
                moduleSpecifier: "./test1"
            });
        });

        describe("named import", () => {
            runReExportDefinitionTests(f.reExports[1], {
                moduleSpecifier: "./test2",
                namedExports: [{
                    name: "namedImport1",
                    alias: "aliasName"
                }, {
                    name: "namedImport2"
                }]
            });
        });
    });

    describe("#getImport()", () => {
        const f = new FileDefinition();
        f.addImport({
            moduleSpecifier: "./test1",
            starImportName: "myStarImport1"
        });
        f.addImport({
            moduleSpecifier: "./test2",
            starImportName: "myStarImport2"
        });

        it("should have the correct module specifier", () => {
            assert.equal(f.getImport(i => i.moduleSpecifier === "./test2").moduleSpecifier, "./test2");
        });
    });

    describe("#getReExport()", () => {
        const f = new FileDefinition();
        f.addReExport({
            moduleSpecifier: "./test1"
        });
        f.addReExport({
            moduleSpecifier: "./test2"
        });

        it("should have the correct module specifier", () => {
            assert.equal(f.getReExport(i => i.moduleSpecifier === "./test2").moduleSpecifier, "./test2");
        });
    });

    describe("#getModuleSpecifierToFile()", () => {
        it("should handle windows file paths", () => {
            const f1 = createFile({ fileName: "C:\\asdf\\asdf.ts" });
            const f2 = createFile({ fileName: "C:\\test\\test.ts" });
            assert.equal(f1.getModuleSpecifierToFile(f2), "./../test/test");
        });

        it("should get the relative paths between two files when going up then down a directory", () => {
            const f1 = createFile({ fileName: "/asdf/asdf.ts" });
            const f2 = createFile({ fileName: "/test/test.ts" });
            assert.equal(f1.getModuleSpecifierToFile(f2), "./../test/test");
        });

        it("should get the relative paths between two files when going up directories", () => {
            const f1 = createFile({ fileName: "/asdf1/asdf2/asdf.ts" });
            const f2 = createFile({ fileName: "/test.ts" });
            assert.equal(f1.getModuleSpecifierToFile(f2), "./../../test");
        });

        it("should get the relative paths between two files when going into directories", () => {
            const f1 = createFile({ fileName: "/asdf.ts" });
            const f2 = createFile({ fileName: "/test1/test2/test3.ts" });
            assert.equal(f1.getModuleSpecifierToFile(f2), "./test1/test2/test3");
        });

        it("should get the relative paths between two files in the same directory", () => {
            const f1 = createFile({ fileName: "/directory/asdf.ts" });
            const f2 = createFile({ fileName: "/directory/test.ts" });
            assert.equal(f1.getModuleSpecifierToFile(f2), "./test");
        });

        it("should throw an error if the first file has an empty file name", () => {
            const f1 = createFile({ fileName: "" });
            const f2 = createFile({ fileName: "/directory/test.ts" });
            assert.throws(() => f1.getModuleSpecifierToFile(f2));
        });

        it("should throw an error if the second file has an empty file name", () => {
            const f1 = createFile({ fileName: "/directory/asdf.ts" });
            const f2 = createFile({ fileName: "" });
            assert.throws(() => f1.getModuleSpecifierToFile(f2));
        });

        it("should throw an error if the first file has a null file name", () => {
            const f1 = createFile({ fileName: null });
            const f2 = createFile({ fileName: "/directory/test.ts" });
            assert.throws(() => f1.getModuleSpecifierToFile(f2));
        });

        it("should throw an error if the second file has a null file name", () => {
            const f1 = createFile({ fileName: "/directory/asdf.ts" });
            const f2 = createFile({ fileName: null });
            assert.throws(() => f1.getModuleSpecifierToFile(f2));
        });
    });
});
