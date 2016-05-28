import * as assert from "assert";
import {createVariable} from "./../../createFunctions";
import {GlobalDefinition} from "./../../definitions";

describe("GlobalDefinition", () => {
    describe("#addDefinitionAsImportToFile()", () => {
        const def = new GlobalDefinition();
        def.addFiles({
            fileName: "/file1.ts",
            classes: [{
                name: "MyClass",
                isExported: true
            }, {
                name: "MyOtherClass",
                isDefaultExportOfFile: true
            }, {
                name: "MyNonExportedClass"
            }],
            namespaces: [{
                name: "MyNamespace",
                isExported: true,
                classes: [{
                    name: "MyClassInNamespace",
                    isExported: true
                }]
            }]
        }, {
            fileName: "/file2.ts"
        });

        const file1 = def.getFile("file1.ts");
        const file2 = def.getFile("file2.ts");

        it("should throw an error when specifying a definition that is not exported", () => {
            assert.throws(() => def.addDefinitionAsImportToFile({ definition: file1.getClass("MyNonExportedClass"), file: file2 }));
        });

        it("should throw an error when specifying a definition that does not exist in the global definition", () => {
            assert.throws(() => def.addDefinitionAsImportToFile({ definition: createVariable({ name: "myVar", isExported: true }), file: file2 }));
        });

        it("should throw an error when specifying a definition that is in a namespace", () => {
            assert.throws(() => def.addDefinitionAsImportToFile({ definition: file1.getNamespace("MyNamespace").classes[0], file: file2 }));
        });

        describe("adding an exported definition as an import to another file", () => {
            def.addDefinitionAsImportToFile({ definition: file1.getClass("MyClass"), file: file2 });

            it("should have a name of MyClass", () => {
                assert.equal(file2.imports[0].namedImports[0].definitions[0].name, "MyClass");
            });

            it("should have a module specifier of ./file1", () => {
                assert.equal(file2.imports[0].moduleSpecifier, "./file1");
            });
        });

        describe("adding an exported definition as an import to another file with an alias", () => {
            def.addDefinitionAsImportToFile({ definition: file1.getClass("MyClass"), file: file2, alias: "myAlias" });
            it("should have an importName of myAlias", () => {
                assert.equal(file2.imports[1].namedImports[0].importName, "myAlias");
            });
        });
    });

    describe("#addFiles()", () => {
        const def = new GlobalDefinition();
        def.addFiles({ fileName: "test.ts" }, { fileName: "test2.ts" });

        // good enough to just check the number of files is correct...
        // this is tested more thoroughly in the createFile tests
        it("should have the right number of files", () => {
            assert.equal(def.files.length, 2);
        });
    });

    describe("#getFile()", () => {
        const def = new GlobalDefinition();
        def.addFiles({ fileName: "test.ts" }, { fileName: "test2.ts" });

        it("should get the correct file when specifying a file name", () => {
            assert.equal(def.getFile("test2.ts"), def.files[1]);
        });

        it("should get the correct file when specifying a function", () => {
            assert.equal(def.getFile(f => f.fileName === "test2.ts"), def.files[1]);
        });
    });

    describe("#getFileOfDefinition()", () => {
        // no need to test anything extravagant in here because this method calls getNamespacesToDefinition()
        const def = new GlobalDefinition();
        def.addFiles({
            fileName: "dummy.ts"
        }, {
            namespaces: [{
                name: "n",
                variables: [{
                    name: "v"
                }]
            }]
        });

        it("should get the correct file when specifying something in a file", () => {
            assert.equal(def.getFileOfDefinition(def.files[1].namespaces[0].variables[0]), def.files[1]);
        });

        it("should return null when specifying something not in a file", () => {
            assert.equal(def.getFileOfDefinition(createVariable({ name: "v" })), null);
        });
    });

    describe("#getNamespacesToDefinition()", () => {
        const def = new GlobalDefinition();
        def.addFiles({
            fileName: "dummy.ts"
        }, {
            namespaces: [{
                name: "n1"
            }, {
                name: "n2",
                namespaces: [{
                    name: "n3",
                    variables: [{ name: "v1" }, { name: "v2" }]
                }]
            }]
        }, {
            variables: [{ name: "v" }]
        });

        describe("getting the file and namespaces to a variable in a file", () => {
            const result = def.getFileAndNamespacesToDefinition(def.files[2].variables[0]);

            it("should have the correct file", () => {
                assert.equal(result.file, def.files[2]);
            });

            it("the array should have the correct namespace length", () => {
                assert.equal(result.namespaces.length, 0);
            });
        });

        describe("getting the file and namespaces to a variable in a file within a namespace", () => {
            const result = def.getFileAndNamespacesToDefinition(def.files[1].namespaces[1].namespaces[0].variables[1]);

            it("should have the correct file", () => {
                assert.equal(result.file, def.files[1]);
            });

            it("the array should have the correct namespace length", () => {
                assert.equal(result.namespaces.length, 2);
            });

            it("should have the first namespace as the first item in the array", () => {
                assert.equal(result.namespaces[0], def.files[1].namespaces[1]);
            });

            it("should have the second namespace as the second item in the array", () => {
                assert.equal(result.namespaces[1], def.files[1].namespaces[1].namespaces[0]);
            });
        });

        describe("getting the file and namespaces to a variable not in any file", () => {
            const result = def.getFileAndNamespacesToDefinition(createVariable({ name: "v" }));

            it("result should be null", () => {
                assert.equal(result, null);
            });
        });
    });
});
