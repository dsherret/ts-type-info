import * as assert from "assert";
import {createVariable} from "./../../createFunctions";
import {GlobalDefinition} from "./../../definitions";
import {getInfoFromString} from "./../../main";

describe("GlobalDefinition", () => {
    describe("#addDefinitionAsImportToFile()", () => {
        const def = new GlobalDefinition();
        def.addFile({
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

    describe("#renameDefinitionAs()", () => {
        describe("renaming without imports", () => {
            const code =
`namespace MyNamespace {
    interface MyInterface extends MyClass {
        prop: MyClass;

        method2(m: MyClass): void;
    }
}

class MyOtherClass<T> {
}

class MyClass extends MyOtherClass<MyClass> {
    property = new MyClass();

    method(p = new MyClass()): p is MyClass {
    }
}

let myVar: MyClass & MyOtherClass<MyClass>;
`;
            const file = getInfoFromString(code);
            const globalDef = new GlobalDefinition();
            globalDef.files.push(file);
            globalDef.renameDefinitionAs(file.getClass("MyClass"), "MyNewName");

            it("should rename the definition", () => {
                assert.equal(file.write(), code.replace(/MyClass/g, "MyNewName"));
            });
        });

        describe("renaming with assignment to variable", () => {
            const code =
`namespace MyNamespace {
    export namespace MyInnerNamespace {
        export class MyClass {
        }
    }
}

var t = MyNamespace;
var a = t.MyInnerNamespace;
var b = a.MyClass;
`;
            const file = getInfoFromString(code);
            const globalDef = new GlobalDefinition();
            globalDef.files.push(file);
            globalDef.renameDefinitionAs(file.getNamespace("MyNamespace").getNamespace("MyInnerNamespace").getClass("MyClass"), "MyNewName");

            it("should rename the definition", () => {
                assert.equal(file.write(), code.replace(/MyClass/g, "MyNewName"));
            });
        });

        function getGlobalDef({ aliasName = "", isDefaultImport = false }) {
            const globalDef = new GlobalDefinition();
            globalDef.addFile({
                fileName: "C:\\MyClass.ts",
                classes: [{
                    name: "MyClass",
                    isExported: true,
                    isDefaultExportOfFile: isDefaultImport
                }, {
                    name: "MyOtherClass",
                    isExported: true
                }],
                variables: [{
                    name: "myVar",
                    type: "MyClass"
                }],
                defaultExportExpression: isDefaultImport ? "MyClass" : null
            });
            globalDef.addFile({
                fileName: "C:\\Main.ts",
                variables: [{
                    name: "myVar",
                    type: aliasName || "MyClass"
                }, {
                    name: "myVar2",
                    type: "MyClass"
                }],
                imports: [{
                    defaultImportName: "dummy",
                    moduleSpecifier: "./dummyImport"
                }]
            });

            globalDef.addDefinitionAsImportToFile({
                definition: globalDef.files[0].classes[0],
                file: globalDef.files[1],
                alias: aliasName
            });

            globalDef.addDefinitionAsImportToFile({
                definition: globalDef.files[0].classes[1],
                file: globalDef.files[1]
            });

            return globalDef;
        }

        describe("renaming with imports and no alias", () => {
            const expectedCode =
`import dummy from "./dummyImport";
import {MyNewName} from "./MyClass";
import {MyOtherClass} from "./MyClass";

let myVar: MyNewName;
let myVar2: MyNewName;
`;
            const globalDef = getGlobalDef({});
            globalDef.renameDefinitionAs(globalDef.files[0].classes[0], "MyNewName");

            it("should write the file, change the imports, and change the reference in the file", () => {
                assert.equal(globalDef.files[1].write(), expectedCode);
            });

            it("should rename the definition", () => {
                assert.equal(globalDef.files[0].classes[0].name, "MyNewName");
            });
        });

        describe("renaming with imports and an alias", () => {
            const expectedCode =
`import dummy from "./dummyImport";
import {MyNewName as MyAlias} from "./MyClass";
import {MyOtherClass} from "./MyClass";

let myVar: MyAlias;
let myVar2: MyClass;
`;

            it("should write the file and only change the import", () => {
                const globalDef = getGlobalDef({ aliasName: "MyAlias" });
                globalDef.renameDefinitionAs(globalDef.files[0].classes[0], "MyNewName");
                assert.equal(globalDef.files[1].write(), expectedCode);
            });
        });

        describe("renaming with default import", () => {
            const globalDef = getGlobalDef({ aliasName: "MyClass", isDefaultImport: true });
            globalDef.renameDefinitionAs(globalDef.files[0].classes[0], "MyNewName");

            it("should rename in the file the default import is contained in", () => {
                const expectedCode =
`class MyNewName {
}

export class MyOtherClass {
}

let myVar: MyNewName;

export default MyNewName;
`;
                assert.equal(globalDef.files[0].write(), expectedCode);
            });

            it("should not rename anything in the other file", () => {
                const expectedCode =
`import dummy from "./dummyImport";
import {default as MyClass} from "./MyClass";
import {MyOtherClass} from "./MyClass";

let myVar: MyClass;
let myVar2: MyClass;
`;
                assert.equal(globalDef.files[1].write(), expectedCode);
            });
        });
    });
});
