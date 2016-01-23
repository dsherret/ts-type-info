var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
var definitions_1 = require("./../../../definitions");
describe("module tests", function () {
    var code = "\nmodule MyModule {\n    class MyModuleClass {}\n    export class MyExportedModuleClass {}\n    enum MyModuleEnum {}\n    export enum MyExportedModuleEnum {}\n    function myModuleFunction() {}\n    export function myExportedModuleFunction() {}\n    interface MyModuleInterface {}\n    export interface MyExportedModuleInterface {}\n    module MyInnerModule {\n    }\n    export module MyInnerExportedModule {\n        export class MyInnerModuleClass {}\n    }\n    namespace MyInnerNamespace {\n    }\n    export namespace MyInnerExportedNamespace {\n        export class MyInnerNamespaceClass {}\n    }\n}\nexport module MyExportedModule {\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        namespaces: [{
                name: "MyModule",
                declarationType: definitions_1.NamespaceDeclarationType.Module,
                classes: [
                    { name: "MyModuleClass" },
                    { name: "MyExportedModuleClass", isExported: true }
                ],
                enums: [
                    { name: "MyModuleEnum" },
                    { name: "MyExportedModuleEnum", isExported: true }
                ],
                functions: [
                    { name: "myModuleFunction" },
                    { name: "myExportedModuleFunction", isExported: true }
                ],
                interfaces: [
                    { name: "MyModuleInterface" },
                    { name: "MyExportedModuleInterface", isExported: true }
                ],
                namespaces: [{
                        name: "MyInnerModule",
                        declarationType: definitions_1.NamespaceDeclarationType.Module
                    }, {
                        name: "MyInnerExportedModule",
                        declarationType: definitions_1.NamespaceDeclarationType.Module,
                        isExported: true,
                        classes: [
                            { name: "MyInnerModuleClass", isExported: true }
                        ]
                    }, {
                        name: "MyInnerNamespace",
                        declarationType: definitions_1.NamespaceDeclarationType.Namespace
                    }, {
                        name: "MyInnerExportedNamespace",
                        declarationType: definitions_1.NamespaceDeclarationType.Namespace,
                        isExported: true,
                        classes: [
                            { name: "MyInnerNamespaceClass", isExported: true }
                        ]
                    }]
            }, {
                name: "MyExportedModule",
                declarationType: definitions_1.NamespaceDeclarationType.Module,
                isExported: true
            }]
    });
});

//# sourceMappingURL=module-tests.js.map
