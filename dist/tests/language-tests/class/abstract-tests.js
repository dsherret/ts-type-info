var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class abstract tests", function () {
    var code = "\nabstract class MyAbstractClass {\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        classes: [{
                name: "MyAbstractClass",
                isAbstract: true
            }]
    });
});

//# sourceMappingURL=abstract-tests.js.map
