import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("union type tests", () => {
    const code = `
class MyClass {
    prop: MyClass | MyOtherClass<string>;
}

class MyOtherClass<T> {
}
`;

    const def = getInfoFromString(code);

    // todo: verify this works in testing
    runFileDefinitionTests(def, {
        classes: [{
            name: "MyClass",
            properties: [{
                name: "prop",
                typeExpression: {
                    text: "MyClass | MyOtherClass<string>",
                    types: [{
                        text: "MyClass",
                        definitions: [{
                            name: "MyClass"
                        }]
                    }, {
                        text: "MyOtherClass<string>",
                        typeArguments: [{
                            text: "string"
                        }],
                        definitions: [{
                            name: "MyOtherClass"
                        }]
                    }]
                }
            }]
        }, {
            name: "MyOtherClass",
            typeParameters: [{
                name: "T"
            }]
        }]
    });
});
