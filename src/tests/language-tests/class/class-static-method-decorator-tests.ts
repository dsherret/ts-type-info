import * as assert from "assert";
import {getStringInfo} from "./../../../main";
import {runDecoratorDefinitionTests} from "./../../test-helpers";

describe("class static method decorator tests", () => {
    const code = `
function MyClassStaticMethodDecorator(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    return descriptor;
}

class MyClass {
    @MyClassStaticMethodDecorator
    static myStaticMethod1() {
    }

    static myStaticMethod2() {
    }
}
`;

    const def = getStringInfo(code);

    describe("myStaticMethod1", () => {
        const m = def.classes[0].staticMethods[0];

        it("will have one decorator", () => {
            assert.equal(m.decorators.length, 1);
        });

        describe("MyClassStaticMethodDecorator", () => {
            runDecoratorDefinitionTests(m.decorators[0], {
                name: "MyClassStaticMethodDecorator",
                arguments: []
            });
        });
    });

    describe("myStaticMethod2", () => {
        const m = def.classes[0].staticMethods[1];

        it("will have zero decorators", () => {
            assert.equal(m.decorators.length, 0);
        });
    });
});
