var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("function type tests", function () {
    var code = "\nfunction myFunc(func: <T extends string>(str: T, num?: number) => void) {\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        functions: [{
                name: "myFunc",
                parameters: [{
                        name: "func",
                        typeExpression: {
                            text: "<T extends string>(str: T, num?: number) => void",
                            types: [{
                                    text: "<T extends string>(str: T, num?: number) => void",
                                    callSignatures: [{
                                            minArgumentCount: 1,
                                            typeParameters: [{
                                                    name: "T",
                                                    constraintTypeExpression: { text: "string" }
                                                }],
                                            parameters: [{
                                                    name: "str",
                                                    typeExpression: { text: "T" }
                                                }, {
                                                    name: "num",
                                                    typeExpression: { text: "number" },
                                                    isOptional: true
                                                }]
                                        }]
                                }]
                        }
                    }]
            }]
    });
});

//# sourceMappingURL=function-type-tests.js.map
