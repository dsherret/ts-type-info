import * as assert from "assert";
import {getStringInfo} from "./../../../main";
import {runDecoratorDefinitionTests} from "./../../test-helpers";

describe("class decorator tests", () => {
    const code = `
function MyClassDecorator(target: Function) {
    console.log(target);
}

@MyClassDecorator
class MyClass1 {
}

class MyClass2 {
}
`;

    const def = getStringInfo(code);

    describe("MyClass1", () => {
        const c = def.classes[0];

        it("will have one decorator", () => {
            assert.equal(c.decorators.length, 1);
        });

        describe("MyClassDecorator", () => {
            runDecoratorDefinitionTests(c.decorators[0], {
                name: "MyClassDecorator",
                arguments: []
            });
        });
    });

    describe("MyClass2", () => {
        const c = def.classes[1];

        it("will have zero decorators", () => {
            assert.equal(c.decorators.length, 0);
        });
    });
});
