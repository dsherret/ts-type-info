import * as assert from "assert";
import {FileDefinition} from "./../../../definitions";
import {runImportDefinitionTests, runReExportDefinitionTests} from "./../../testHelpers";

describe("FileDefinition", () => {
    describe("addImports", () => {
        describe("multiple imports", () => {
            const f = new FileDefinition();
            f.addImports({
                moduleSpecifier: "./test1",
                starImportName: "myStarImport1"
            }, {
                moduleSpecifier: "./test2",
                defaultImportName: "defaultImport1"
            }, {
                moduleSpecifier: "./test3",
                namedImports: ["namedImport1", "namedImport2"]
            }, {
                moduleSpecifier: "./test4",
                namedImports: ["namedImport3", "namedImport4"],
                defaultImportName: "defaultImport2"
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
                    namedImports: [{ importName: "namedImport1" }, { importName: "namedImport2" }]
                });
            });

            describe("named import with default import", () => {
                runImportDefinitionTests(f.imports[3], {
                    moduleSpecifier: "./test4",
                    defaultImport: { importName: "defaultImport2" },
                    namedImports: [{ importName: "namedImport3" }, { importName: "namedImport4" }]
                });
            });
        });

        it("should error when nothing but a moduleSpecifier is specified", () => {
            const f = new FileDefinition();
            assert.throws(() => {
                f.addImports({
                    moduleSpecifier: "./test1"
                });
            }, /specify either a starImport/);
        });

        it("should error when a star import and named import are specified", () => {
            const f = new FileDefinition();
            assert.throws(() => {
                f.addImports({
                    moduleSpecifier: "./test1",
                    starImportName: "test",
                    namedImports: ["test2"]
                });
            }, /specify namedImports/);
        });

        it("should error when a star import and default import are specified", () => {
            const f = new FileDefinition();
            assert.throws(() => {
                f.addImports({
                    moduleSpecifier: "./test1",
                    starImportName: "test",
                    defaultImportName: "test2"
                });
            }, /specify a defaultImport/);
        });
    });

    describe("addReExports", () => {
        const f = new FileDefinition();
        f.addReExports({
            moduleSpecifier: "./test1"
        }, {
            moduleSpecifier: "./test2",
            namedExports: ["namedImport1", "namedImport2"]
        });

        describe("import star", () => {
            runReExportDefinitionTests(f.reExports[0], {
                moduleSpecifier: "./test1"
            });
        });

        describe("named import", () => {
            runReExportDefinitionTests(f.reExports[1], {
                moduleSpecifier: "./test2",
                namedExports: [{ exportName: "namedImport1" }, { exportName: "namedImport2" }]
            });
        });
    });
});
