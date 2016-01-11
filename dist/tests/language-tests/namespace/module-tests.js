var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("namespace tests", function () {
    var code = "\nmodule MyModule {\n    export class MyClass {\n    }\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runNamespaceDefinitionTests(def.namespaces[0], {
        name: "MyModule",
        classNames: ["MyClass"]
    });
});

//# sourceMappingURL=module-tests.js.map
