import * as assert from "assert";
import {getStringInfo} from "./../../../main";
import {runDecoratorDefinitionTests} from "./../../test-helpers";

describe("class property decorator tests", () => {
    const code = `
function MyClassStaticPropertyDecorator(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    return descriptor;
}

class MyClass {
    @MyClassStaticPropertyDecorator
    static myStaticProperty1: string;
    static myStaticProperty2: string;
}
`;

    const def = getStringInfo(code);

    describe("myStaticProperty1", () => {
        const p = def.classes[0].staticProperties[0];

        it("will have one decorator", () => {
            assert.equal(p.decorators.length, 1);
        });

        describe("MyClassStaticPropertyDecorator", () => {
            runDecoratorDefinitionTests(p.decorators[0], {
                name: "MyClassStaticPropertyDecorator",
                arguments: []
            });
        });
    });

    describe("myStaticProperty2", () => {
        const p = def.classes[0].staticProperties[1];

        it("will have zero decorators", () => {
            assert.equal(p.decorators.length, 0);
        });
    });
});
