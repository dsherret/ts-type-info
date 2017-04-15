import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("decorator tests", () => {
    const code = `
@namespaceTest.decorator
@namespaceTest.decorator()
@MyClassDecorator
@MyClassDecorator()
class MyClass1 {
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyClass1",
            decorators: [{
                name: "namespaceTest.decorator"
            }, {
                name: "namespaceTest.decorator",
                isDecoratorFactory: true
            }, {
                name: "MyClassDecorator"
            }, {
                name: "MyClassDecorator",
                isDecoratorFactory: true
            }]
        }]
    });
});
