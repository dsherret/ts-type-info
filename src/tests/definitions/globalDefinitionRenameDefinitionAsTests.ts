import * as assert from "assert";
import * as path from "path";
import {GlobalDefinition} from "./../../definitions";
import {getInfoFromString, getInfoFromFiles} from "./../../main";
import {createVariable} from "./../../createFunctions";

describe("GlobalDefinition", () => {
    describe("#renameDefinitionAs()", () => {
        describe("passing in a definition that doesn't exist in the global definition", () => {
            it("should not error", () => {
                const originalCode = "var myString: string;\n";
                const file = getInfoFromString(originalCode);
                const globalDef = new GlobalDefinition();
                globalDef.files.push(file);
                globalDef.renameDefinitionAs(createVariable({ name: "myOtherVar" }), "MyNewName");
                assert.equal(file.write(), originalCode);
            });
        });

        describe("renaming for internal modules", () => {
            const globalDef = new GlobalDefinition();
            globalDef.addFile({
                namespaces: [{
                    name: "MyNamespace",
                    variables: [{
                        name: "c",
                        defaultExpression: "MyClass"
                    }],
                    classes: [{
                        name: "MyClass"
                    }]
                }],
                variables: [{
                    name: "d",
                    defaultExpression: "MyNamespace.MyClass"
                }]
            });
            globalDef.addFile({
                variables: [{
                    name: "a",
                    type: "typeof MyNamespace",
                    defaultExpression: "MyNamespace"
                }]
            });
            globalDef.addFile({
                variables: [{
                    name: "b",
                    defaultExpression: "a.MyClass"
                }]
            });
            globalDef.renameDefinitionAs(globalDef.files[0].namespaces[0].classes[0], "MyNewName");

            it("should have the correct code in the main file", () => {
                const expectedCode =
`namespace MyNamespace {
    class MyNewName {
    }

    let c = MyNewName;
}

let d = MyNamespace.MyNewName;
`;
                assert.equal(globalDef.files[0].write(), expectedCode);
            });

            it("should have the correct code in the other file", () => {
                const expectedCode =
`let b = a.MyNewName;
`;
                assert.equal(globalDef.files[2].write(), expectedCode);
            });
        });

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
            globalDef.renameDefinitionAs(file.getClass("MyClass")!, "MyNewName");

            it("should rename the definition", () => {
                assert.equal(file.write(), code.replace(/MyClass/g, "MyNewName"));
            });
        });

        describe("renaming with assignment to variable", () => {
            const code =
`namespace MyNamespace {
    var f = MyNamespace;
    var g = f.MyInnerNamespace.MyClass;
    var h = MyInnerNamespace;
    var i = h.MyClass;

    export namespace MyInnerNamespace {
        var j = MyInnerNamespace;
        var k = h.MyClass;

        export class MyClass {
        }
    }

    namespace MyOtherInnerNamespace {
        var l = h.MyClass;
    }
}

var a = MyNamespace;
var b = a.MyInnerNamespace;
var c = MyNamespace.MyInnerNamespace;
var d = b.MyClass;
var e = c.MyClass;
`;
            const file = getInfoFromString(code);
            const globalDef = new GlobalDefinition();
            globalDef.files.push(file);
            globalDef.renameDefinitionAs(file.getNamespace("MyNamespace")!.getNamespace("MyInnerNamespace")!.getClass("MyClass")!, "MyNewName");

            it("should rename the definition", () => {
                assert.equal(file.write(), code.replace(/MyClass/g, "MyNewName"));
            });
        });

        describe("renaming with imports and no namespace", () => {
            function getGlobalDef({ aliasName = "", isDefaultImport = false }) {
                const globalDef = new GlobalDefinition();
                globalDef.addFile({
                    fileName: "C:\\MyClass.ts",
                    classes: [{
                        name: "MyClass",
                        isNamedExportOfFile: !isDefaultImport,
                        isDefaultExportOfFile: isDefaultImport
                    }, {
                        name: "MyOtherClass",
                        isNamedExportOfFile: true
                    }],
                    variables: [{
                        name: "myVar",
                        type: "MyClass"
                    }],
                    defaultExportExpression: isDefaultImport ? "MyClass" : undefined
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

        describe("renaming with imports and namespace", () => {
            const globalDef = new GlobalDefinition();
            globalDef.addFile({
                fileName: "C:/MyNamespace.ts",
                namespaces: [{
                    name: "MyNamespace",
                    isNamedExportOfFile: true,
                    classes: [{
                        name: "MyClass",
                        isExported: true
                    }]
                }, {
                    name: "MyDefaultNamespace",
                    isDefaultExportOfFile: true,
                    classes: [{
                        name: "MyClass",
                        isExported: true,
                        extendsTypes: ["MyNamespace.MyClass"]
                    }]
                }],
                defaultExportExpression: "MyDefaultNamespace"
            });
            globalDef.addFile({
                fileName: "C:/main.ts",
                imports: [{
                    moduleSpecifier: "./MyNamespace",
                    namedImports: [{
                        name: "MyNamespace"
                    }, {
                        name: "MyNamespace",
                        alias: "MyNamespaceAlias"
                    }, {
                        name: "default",
                        alias: "MyDefaultNamedNamespace"
                    }]
                }, {
                    moduleSpecifier: "./MyNamespace",
                    starImportName: "MyNamespaceModule"
                }, {
                    moduleSpecifier: "./MyNamespace",
                    defaultImportName: "MyDefaultImportNamespace"
                }],
                variables: [{
                    name: "myVar",
                    type: "typeof MyNamespace.MyClass"
                }, {
                    name: "myNamespaceAliasVar",
                    type: "typeof MyNamespaceAlias.MyClass"
                }, {
                    name: "myDefaultNamedNamespaceVar",
                    type: "typeof MyDefaultNamedNamespace.MyClass"
                }, {
                    name: "myVar2",
                    type: "typeof MyNamespaceModule.MyNamespace.MyClass"
                }, {
                    name: "myNamespaceVar",
                    type: "typeof MyNamespace",
                    defaultExpression: "MyNamespace"
                }, {
                    name: "myVar3",
                    type: "typeof MyNamespace.MyClass",
                    defaultExpression: "myNamespaceVar.MyClass"
                }, {
                    name: "myDefaultImportVar",
                    type: "typeof MyDefaultImportNamespace.MyClass"
                }]
            });

            describe("renaming the classes", () => {
                globalDef.renameDefinitionAs(globalDef.files[0].namespaces[0].classes[0], "MyNewName");
                globalDef.renameDefinitionAs(globalDef.files[0].namespaces[1].classes[0], "MyOtherNewName");

                it("should rename the class in the main file", () => {
                    const expectedCode =
`export namespace MyNamespace {
    export class MyNewName {
    }
}

namespace MyDefaultNamespace {
    export class MyOtherNewName extends MyNamespace.MyNewName {
    }
}

export default MyDefaultNamespace;
`;
                    assert.equal(globalDef.files[0].write(), expectedCode);
                });

                it("should rename the class in the other file", () => {
                    const expectedCode =
`import {MyNamespace, MyNamespace as MyNamespaceAlias, default as MyDefaultNamedNamespace} from "./MyNamespace";
import * as MyNamespaceModule from "./MyNamespace";
import MyDefaultImportNamespace from "./MyNamespace";

let myVar: typeof MyNamespace.MyNewName;
let myNamespaceAliasVar: typeof MyNamespaceAlias.MyNewName;
let myDefaultNamedNamespaceVar: typeof MyDefaultNamedNamespace.MyOtherNewName;
let myVar2: typeof MyNamespaceModule.MyNamespace.MyNewName;
let myNamespaceVar = MyNamespace;
let myVar3 = myNamespaceVar.MyNewName;
let myDefaultImportVar: typeof MyDefaultImportNamespace.MyOtherNewName;
`;
                    assert.equal(globalDef.files[1].write(), expectedCode);
                });
            });
        });

        describe("renaming re-exported definitions", () => {
            const globalDef = new GlobalDefinition();
            globalDef.addFile({
                fileName: "C:/MyClass.ts",
                classes: [{
                    name: "MyClass",
                    isNamedExportOfFile: true
                }],
                namespaces: [{
                    name: "MyNamespace",
                    classes: [{
                        name: "MyInnerClass",
                        isExported: true
                    }],
                    isDefaultExportOfFile: true
                }],
                defaultExportExpression: "MyNamespace"
            });
            globalDef.addFile({
                fileName: "C:/classes.ts",
                reExports: [{
                    moduleSpecifier: "./MyClass"
                }]
            });
            globalDef.addFile({
                fileName: "C:/namedClasses.ts",
                reExports: [{
                    moduleSpecifier: "./MyClass",
                    namedExports: [{
                        name: "MyClass"
                    }, {
                        name: "MyClass",
                        alias: "MyClassAlias"
                    }, {
                        name: "default",
                        alias: "MyNamespace"
                    }]
                }]
            });
            globalDef.addFile({
                fileName: "C:/main.ts",
                imports: [{
                    moduleSpecifier: "./classes",
                    namedImports: [{
                        name: "MyClass"
                    }, {
                        name: "MyClass",
                        alias: "MyClassAlias"
                    }]
                }, {
                    moduleSpecifier: "./namedClasses",
                    namedImports: [{
                        name: "MyClass",
                        alias: "MyClassAlias2"
                    }, {
                        name: "MyNamespace",
                        alias: "MyAliasNamespace"
                    }]
                }],
                variables: [{
                    name: "a",
                    type: "MyClass"
                }, {
                    name: "b",
                    type: "MyClassAlias"
                }, {
                    name: "c",
                    type: "MyAliasNamespace.MyInnerClass"
                }]
            });

            const file = globalDef.getFile("MyClass.ts")!;
            globalDef.renameDefinitionAs(file.classes[0], "MyNewName");
            globalDef.renameDefinitionAs(file.namespaces[0].classes[0], "MyNewInnerClass");

            it("should rename the re-exports appropriately", () => {
                const expectedCode =
`export {MyNewName, MyNewName as MyClassAlias, default as MyNamespace} from "./MyClass";
`;

                assert.equal(globalDef.getFile("namedClasses.ts")!.write(), expectedCode);
            });

            it("should rename the imported re-exported definition in the main file", () => {
                const expectedCode =
`import {MyNewName, MyNewName as MyClassAlias} from "./classes";
import {MyNewName as MyClassAlias2, MyNamespace as MyAliasNamespace} from "./namedClasses";

let a: MyNewName;
let b: MyClassAlias;
let c: MyAliasNamespace.MyNewInnerClass;
`;

                assert.equal(globalDef.getFile("main.ts")!.write(), expectedCode);
            });
        });

        describe("re-naming default exports", () => {
            const globalDef = getInfoFromFiles([path.join(__dirname, "./../../../src/tests/testFiles/reExportRename/main.ts")]);
            globalDef.renameDefinitionAs(globalDef.getFile("MyNamespace.ts")!.namespaces[0].classes[0], "MyNewClass");

            it("should rename in the main file correctly", () => {
                const expectedCode =
`import * as StarImport from "./reExports";
import {MyNamespace, MyNamespace as MyNamespaceAlias} from "./reExports";

let a = StarImport.MyNamespace.MyNewClass;
let b = MyNamespace.MyNewClass;
let c = MyNamespaceAlias.MyNewClass;
`;
                assert.equal(globalDef.getFile("main.ts")!.write(), expectedCode);
            });
        });
    });
});
