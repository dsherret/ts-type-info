import * as assert from "assert";
import {createVariable} from "./../../createFunctions";
import {GlobalDefinition} from "./../../definitions";

describe("GlobalDefinition", () => {
    describe("#addDefinitionAsImportToFile()", () => {
        const def = new GlobalDefinition();
        def.addFile({
            fileName: "/file1.ts",
            classes: [{
                name: "MyClass",
                isNamedExportOfFile: true
            }, {
                name: "MyOtherClass",
                isDefaultExportOfFile: true
            }, {
                name: "MyNonExportedClass"
            }],
            namespaces: [{
                name: "MyDefaultNamespace",
                isDefaultExportOfFile: true,
                classes: [{
                    name: "MyClassInNamespace",
                    isExported: true
                }]
            }]
        });
        def.addFile({
            fileName: "/file2.ts"
        });

        const file1 = def.getFile("file1.ts");
        const file2 = def.getFile("file2.ts");

        it("should throw an error when specifying a definition that is not exported", () => {
            assert.throws(() => def.addDefinitionAsImportToFile({ definition: file1.getClass("MyNonExportedClass"), file: file2 }));
        });

        it("should throw an error when specifying a definition that does not exist in the global definition", () => {
            assert.throws(() => def.addDefinitionAsImportToFile({ definition: createVariable({ name: "myVar", isNamedExportOfFile: true }), file: file2 }));
        });

        describe("adding an exported definition as an import to another file", () => {
            def.addDefinitionAsImportToFile({ definition: file1.getClass("MyClass"), file: file2 });
            const importDef = file2.imports[0];

            it("should have a name of MyClass", () => {
                assert.equal(importDef.namedImports[0].name, "MyClass");
            });

            it("should have a definition of MyClass", () => {
                assert.equal(importDef.namedImports[0].definitions[0].name, "MyClass");
            });

            it("should have a module specifier of ./file1", () => {
                assert.equal(importDef.moduleSpecifier, "./file1");
            });
        });

        describe("adding an exported definition as an import inside a namespace", () => {
            def.addDefinitionAsImportToFile({ definition: file1.getNamespace("MyDefaultNamespace").getClass("MyClassInNamespace"), file: file2 });
            const importDef = file2.imports[1];

            it("should have a definition of MyDefaultNamespace", () => {
                assert.equal(importDef.namedImports[0].definitions[0].name, "MyDefaultNamespace");
            });

            it("should have a name of default", () => {
                assert.equal(importDef.namedImports[0].name, "default");
            });

            it("should have an alias of MyDefaultNamespace", () => {
                assert.equal(importDef.namedImports[0].alias, "MyDefaultNamespace");
            });

            it("should have a module specifier of ./file1", () => {
                assert.equal(importDef.moduleSpecifier, "./file1");
            });
        });

        describe("adding an exported definition as an import to another file with an alias", () => {
            def.addDefinitionAsImportToFile({ definition: file1.getClass("MyClass"), file: file2, alias: "myAlias" });
            const importDef = file2.imports[2];

            it("should have an alias of myAlias", () => {
                assert.equal(importDef.namedImports[0].alias, "myAlias");
            });
        });
    });

    describe("#addFile()", () => {
        const def = new GlobalDefinition();
        const returnedDef = def.addFile({ fileName: "test.ts" });
        def.addFile({ fileName: "test2.ts" });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, def.files[0]);
        });

        // good enough to just check the number of files is correct...
        // this is tested more thoroughly in the createFile tests
        it("should have the right number of files", () => {
            assert.equal(def.files.length, 2);
        });
    });

    describe("#getFile()", () => {
        const def = new GlobalDefinition();
        def.addFile({ fileName: "test.ts" });
        def.addFile({ fileName: "test2.ts" });

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
        def.addFile({
            fileName: "dummy.ts"
        });
        def.addFile({
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
        def.addFile({
            fileName: "dummy.ts"
        });
        def.addFile({
            namespaces: [{
                name: "n1"
            }, {
                name: "n2",
                namespaces: [{
                    name: "n3",
                    variables: [{ name: "v1" }, { name: "v2" }]
                }]
            }]
        });
        def.addFile({
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
