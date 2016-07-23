import * as assert from "assert";
import {GlobalDefinition} from "./../../definitions";
import {getInfoFromString} from "./../../main";

describe("GlobalDefinition", () => {
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

var a = MyNamespace;
var b = a.MyInnerNamespace;
var c = MyNamespace.MyInnerNamespace;
var d = b.MyClass;
var e = c.MyClass;
`;
            const file = getInfoFromString(code);
            const globalDef = new GlobalDefinition();
            globalDef.files.push(file);
            globalDef.renameDefinitionAs(file.getNamespace("MyNamespace").getNamespace("MyInnerNamespace").getClass("MyClass"), "MyNewName");

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
`import {MyNamespace} from "./MyNamespace";
import * as MyNamespaceModule from "./MyNamespace";
import MyDefaultImportNamespace from "./MyNamespace";

let myVar: typeof MyNamespace.MyNewName;
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
                }]
            });
            globalDef.addFile({
                fileName: "C:/classes.ts",
                reExports: [{
                    moduleSpecifier: "./MyClass"
                }]
            });
            globalDef.addFile({
                fileName: "C:/main.ts",
                imports: [{
                    moduleSpecifier: "./classes",
                    namedImports: [{
                        name: "MyClass"
                    }]
                }],
                variables: [{
                    name: "t",
                    type: "MyClass"
                }]
            });

            it("should rename the imported re-exported definition", () => {
                globalDef.renameDefinitionAs(globalDef.getFile("MyClass.ts").classes[0], "MyNewName");
                const expectedCode =
`import {MyNewName} from "./classes";

let t: MyNewName;
`;

                assert.equal(globalDef.getFile("main.ts").write(), expectedCode);
            });
        });
    });
});
