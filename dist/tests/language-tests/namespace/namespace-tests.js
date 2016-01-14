var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("namespace tests", function () {
    var code = "\nnamespace MyNamespace {\n    class MyModuleClass {}\n    export class MyExportedModuleClass {}\n    enum MyModuleEnum {}\n    export enum MyExportedModuleEnum {}\n    function myModuleFunction() {}\n    export function myExportedModuleFunction() {}\n    interface MyModuleInterface {}\n    export interface MyExportedModuleInterface {}\n    module MyInnerModule {\n    }\n    export module MyInnerExportedModule {\n        export class MyInnerModuleClass {}\n    }\n    namespace MyInnerNamespace {\n    }\n    export namespace MyInnerExportedNamespace {\n        export class MyInnerNamespaceClass {}\n    }\n}\nexport namespace MyExportedNamespace {\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        namespaces: [{
                name: "MyNamespace",
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
                        name: "MyInnerModule"
                    }, {
                        name: "MyInnerExportedModule",
                        isExported: true,
                        classes: [
                            { name: "MyInnerModuleClass", isExported: true }
                        ]
                    }, {
                        name: "MyInnerNamespace"
                    }, {
                        name: "MyInnerExportedNamespace",
                        isExported: true,
                        classes: [
                            { name: "MyInnerNamespaceClass", isExported: true }
                        ]
                    }]
            }, {
                name: "MyExportedNamespace",
                isExported: true
            }]
    });
});

//# sourceMappingURL=namespace-tests.js.map
