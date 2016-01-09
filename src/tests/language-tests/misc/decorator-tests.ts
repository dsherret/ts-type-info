import * as assert from "assert";
import {getStringInfo} from "./../../../main";
import {runDecoratorDefinitionTests} from "./../../test-helpers";

describe("class decorator tests", () => {
    const code = `
function MyClassDecorator(str: string) {
    return (target: Function) => {
        console.log(target);
    };
}

@MyClassDecorator("MyString")
class MyClass {
}
`;

    const c = getStringInfo(code).classes[0];

    describe("MyClassDecorator", () => {
        runDecoratorDefinitionTests(c.decorators[0], {
            name: "MyClassDecorator",
            arguments: [{
                text: "MyString"
            }]
        });
    });
});
