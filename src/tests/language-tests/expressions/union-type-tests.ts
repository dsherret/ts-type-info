import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("union type tests", () => {
    const code = `
class MyClass {
    prop: MyClass | MyOtherClass<string>;
}

class MyOtherClass<T> {
}
`;

    const def = getStringInfo(code);

    // todo: verify this works in testing
    runFileDefinitionTests(def, {
        classes: [{
            name: "MyClass",
            properties: [{
                name: "prop",
                typeExpression: {
                    text: "MyClass | MyOtherClass<string>",
                    types: [{
                        text: "MyClass"
                    }, {
                        text: "MyOtherClass<string>",
                        typeArguments: [{
                            text: "string"
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
