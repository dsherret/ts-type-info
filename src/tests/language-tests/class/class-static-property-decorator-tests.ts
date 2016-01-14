import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("class static property decorator tests", () => {
    const code = `
function MyClassStaticPropertyDecorator(target: Object, propertyKey: string) {
}

class MyClass {
    @MyClassStaticPropertyDecorator
    static myStaticProperty: string;
}
`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        functions: [{
            name: "MyClassStaticPropertyDecorator",
            parameters: [{
                name: "target",
                typeExpression: {
                    text: "Object"
                }
            }, {
                name: "propertyKey",
                typeExpression: {
                    text: "string"
                }
            }]
        }],
        classes: [{
            name: "MyClass",
            staticProperties: [{
                name: "myStaticProperty",
                typeExpression: {
                    text: "string"
                },
                decorators: [{
                    name: "MyClassStaticPropertyDecorator"
                }]
            }]
        }]
    });
});
