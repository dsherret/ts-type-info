import * as assert from "assert";
import {getStringInfo} from "./../../../main";
import {runDecoratorDefinitionTests} from "./../../test-helpers";

describe("class method decorator parameter tests", () => {
    const code = `
function MyClassMethodParameterDecorator(target: any, propertyKey: string | symbol, parameterIndex: number) {
}

class MyClass {
    myMethod1(@MyClassMethodParameterDecorator param1: string, param2: string) {
    }
}
`;

    const def = getStringInfo(code);

    describe("param1", () => {
        const p = def.classes[0].methods[0].parameters[0];

        it("will have one decorator", () => {
            assert.equal(p.decorators.length, 1);
        });

        describe("MyClassMethodParameterDecorator", () => {
            runDecoratorDefinitionTests(p.decorators[0], {
                name: "MyClassMethodParameterDecorator",
                arguments: []
            });
        });
    });

    describe("param2", () => {
        const p = def.classes[0].methods[0].parameters[1];

        it("will have zero decorators", () => {
            assert.equal(p.decorators.length, 0);
        });
    });
});
