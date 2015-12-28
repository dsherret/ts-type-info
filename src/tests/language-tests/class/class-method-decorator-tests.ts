import * as assert from "assert";
import {getStringInfo} from "./../../../main";
import {runDecoratorDefinitionTests} from "./../../test-helpers";

describe("class method decorator tests", () => {
    const code = `
function MyClassMethodDecorator(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    return descriptor;
}

class MyClass {
    @MyClassMethodDecorator
    myMethod1() {
    }

    myMethod2() {
    }
}
`;

    const def = getStringInfo(code);

    describe("myMethod1", () => {
        const m = def.classes[0].methods[0];

        it("will have one decorator", () => {
            assert.equal(m.decorators.length, 1);
        });

        describe("MyClassMethodDecorator", () => {
            runDecoratorDefinitionTests(m.decorators[0], {
                name: "MyClassMethodDecorator",
                arguments: []
            });
        });
    });

    describe("myMethod2", () => {
        const m = def.classes[0].methods[1];

        it("will have zero decorators", () => {
            assert.equal(m.decorators.length, 0);
        });
    });
});
