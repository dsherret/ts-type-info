import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("class static property decorator tests", () => {
    const code = `
function MyClassStaticPropertyDecorator(target: Object, propertyKey: string) {
}

class MyClass {
    @MyClassStaticPropertyDecorator
    static myStaticProperty: string;
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        functions: [{
            name: "MyClassStaticPropertyDecorator",
            parameters: [{
                name: "target",
                type: {
                    text: "Object"
                }
            }, {
                name: "propertyKey",
                type: {
                    text: "string"
                }
            }]
        }],
        classes: [{
            name: "MyClass",
            staticProperties: [{
                name: "myStaticProperty",
                type: {
                    text: "string"
                },
                decorators: [{
                    name: "MyClassStaticPropertyDecorator"
                }]
            }]
        }]
    });
});
