import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("class decorator tests", () => {
    const code = `
function MyClassDecorator(target: Function) {
}

@MyClassDecorator
class MyClass1 {
}
`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        functions: [{
            name: "MyClassDecorator",
            parameters: [{
                name: "target",
                typeExpression: {
                    text: "Function"
                }
            }]
        }],
        classes: [{
            name: "MyClass1",
            decorators: [{
                name: "MyClassDecorator"
            }]
        }]
    });
});
