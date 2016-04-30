import * as assert from "assert";
import {FileDefinition} from "./../../../definitions";
import {runImportDefinitionTests, runReExportDefinitionTests} from "./../../testHelpers";

describe("FileDefinition", () => {
    describe("#addImports()", () => {
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
                namedImports: [{
                    name: "namedImport1"
                }, {
                    name: "namedImport2",
                    alias: "aliasName"
                }]
            }, {
                moduleSpecifier: "./test4",
                namedImports: [{
                    name: "namedImport3"
                }],
                defaultImportName: "defaultImport2"
            }, {
                moduleSpecifier: "./test5"
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
                        importName: "namedImport1"
                    }, {
                        importName: "aliasName",
                        definitions: [{
                            name: "namedImport2",
                            type: null
                        }]
                    }]
                });
            });

            describe("named import with default import", () => {
                runImportDefinitionTests(f.imports[3], {
                    moduleSpecifier: "./test4",
                    defaultImport: { importName: "defaultImport2" },
                    namedImports: [{ importName: "namedImport3" }]
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
                f.addImports({
                    moduleSpecifier: "./test1",
                    starImportName: "test",
                    namedImports: [{ name: "test2" }]
                });
            }, /specify namedImports/);
        });
    });

    describe("#addReExports()", () => {
        const f = new FileDefinition();
        f.addReExports({
            moduleSpecifier: "./test1"
        }, {
            moduleSpecifier: "./test2",
            namedExports: [
                { name: "namedImport1", alias: "aliasName" },
                { name: "namedImport2" }
            ]
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
                    exportName: "aliasName",
                    definitions: [{ name: "namedImport1", type: null }]
                }, {
                    exportName: "namedImport2"
                }]
            });
        });
    });

    describe("#getImport()", () => {
        const f = new FileDefinition();
        f.addImports({
            moduleSpecifier: "./test1",
            starImportName: "myStarImport1"
        }, {
            moduleSpecifier: "./test2",
            starImportName: "myStarImport2"
        });

        it("should have the correct module specifier", () => {
            assert.equal(f.getImport(i => i.moduleSpecifier === "./test2").moduleSpecifier, "./test2");
        });
    });

    describe("#getReExport()", () => {
        const f = new FileDefinition();
        f.addReExports({
            moduleSpecifier: "./test1"
        }, {
            moduleSpecifier: "./test2"
        });

        it("should have the correct module specifier", () => {
            assert.equal(f.getReExport(i => i.moduleSpecifier === "./test2").moduleSpecifier, "./test2");
        });
    });
});
