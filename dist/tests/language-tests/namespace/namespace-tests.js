var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("namespace tests", function () {
    var code = "\nnamespace MyNamespace {\n    export class MyExportedNamespaceClass {\n    }\n    class MyNonExportedClass {\n    }\n    namespace MyInnerNamespace {\n        export class MyInnerNamespaceClass {\n        }\n    }\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runNamespaceDefinitionTests(def.namespaces[0], {
        name: "MyNamespace",
        classNames: ["MyExportedNamespaceClass", "MyNonExportedClass"],
        namespaces: [{
                name: "MyInnerNamespace",
                classNames: ["MyInnerNamespaceClass"]
            }]
    });
});

//# sourceMappingURL=namespace-tests.js.map
