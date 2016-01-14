var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("recursive type tests", function () {
    var code = "\nclass Note {\n    name: string;\n    note: Note;\n\n    myMethod(note: Note) {\n        let notes: Note[];\n        return notes;\n    }\n}\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        classes: [{
                name: "Note",
                properties: [{
                        name: "name",
                        typeExpression: { text: "string" }
                    }, {
                        name: "note",
                        typeExpression: { text: "Note" }
                    }],
                methods: [{
                        name: "myMethod",
                        parameters: [{
                                name: "note",
                                typeExpression: { text: "Note" }
                            }],
                        returnTypeExpression: { text: "Note[]" }
                    }]
            }]
    });
});

//# sourceMappingURL=recursive-type-tests.js.map
