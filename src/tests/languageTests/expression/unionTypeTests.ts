import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("union type tests", () => {
    const code = `
class MyClass {
    prop: MyClass | MyOtherClass<MyClass>;
}

class MyOtherClass<T> {
    recursiveRelationshipProp: MyClass;
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyClass",
            properties: [{
                name: "prop",
                type: {
                    text: "MyClass | MyOtherClass<MyClass>",
                    unionTypes: [{
                        text: "MyClass",
                        definitions: [{
                            name: "MyClass"
                        }],
                        allDefinitions: [{
                            name: "MyClass"
                        }]
                    }, {
                        text: "MyOtherClass<MyClass>",
                        typeArguments: [{
                            text: "MyClass",
                            definitions: [{
                                name: "MyClass"
                            }]
                        }],
                        definitions: [{
                            name: "MyOtherClass"
                        }],
                        allDefinitions: [{
                            name: "MyOtherClass"
                        }, {
                            name: "MyClass"
                        }]
                    }],
                    definitions: [],
                    allDefinitions: [{
                        name: "MyClass"
                    }, {
                        name: "MyOtherClass"
                    }]
                }
            }]
        }, {
            name: "MyOtherClass",
            typeParameters: [{
                name: "T"
            }],
            properties: [{
                name: "recursiveRelationshipProp",
                type: {
                    text: "MyClass",
                    definitions: [{
                        name: "MyClass"
                    }],
                    allDefinitions: [{
                        name: "MyClass"
                    }]
                }
            }]
        }]
    });
});
