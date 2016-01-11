var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("module tests", function () {
    var code = "\nmodule MyModule {\n    class MyModuleClass {}\n    export class MyExportedModuleClass {}\n    enum MyModuleEnum {}\n    export enum MyExportedModuleEnum {}\n    function myModuleFunction() {}\n    export function myExportedModuleFunction() {}\n    interface MyModuleInterface {}\n    export interface MyExportedModuleInterface {}\n    export namespace MyInnerModule {\n        export class MyInnerModuleClass {}\n    }\n}\nexport module MyExportedModule {\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runNamespaceDefinitionTests(def.namespaces[0], {
        name: "MyModule",
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
                isExported: true,
                classes: [
                    { name: "MyInnerModuleClass", isExported: true }
                ]
            }]
    });
    test_helpers_1.runNamespaceDefinitionTests(def.namespaces[1], {
        name: "MyExportedModule",
        isExported: true
    });
});

//# sourceMappingURL=module-tests.js.map
