var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("namespace tests", function () {
    var code = "\nnamespace MyNamespace {\n    class MyNamespaceClass {}\n    export class MyExportedNamespaceClass {}\n    enum MyNamespaceEnum {}\n    export enum MyExportedNamespaceEnum {}\n    function myNamespaceFunction() {}\n    export function myExportedNamespaceFunction() {}\n    interface MyNamespaceInterface {}\n    export interface MyExportedNamespaceInterface {}\n    export namespace MyInnerNamespace {\n        export class MyInnerNamespaceClass {}\n    }\n}\nexport namespace MyExportedNamespace {\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runNamespaceDefinitionTests(def.namespaces[0], {
        name: "MyNamespace",
        classes: [
            { name: "MyNamespaceClass" },
            { name: "MyExportedNamespaceClass", isExported: true }
        ],
        enums: [
            { name: "MyNamespaceEnum" },
            { name: "MyExportedNamespaceEnum", isExported: true }
        ],
        functions: [
            { name: "myNamespaceFunction" },
            { name: "myExportedNamespaceFunction", isExported: true }
        ],
        interfaces: [
            { name: "MyNamespaceInterface" },
            { name: "MyExportedNamespaceInterface", isExported: true }
        ],
        namespaces: [{
                name: "MyInnerNamespace",
                isExported: true,
                classes: [
                    { name: "MyInnerNamespaceClass", isExported: true }
                ]
            }]
    });
    test_helpers_1.runNamespaceDefinitionTests(def.namespaces[1], {
        name: "MyExportedNamespace",
        isExported: true
    });
});

//# sourceMappingURL=namespace-tests.js.map
