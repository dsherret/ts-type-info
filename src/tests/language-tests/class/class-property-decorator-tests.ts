import * as assert from "assert";
import {getStringInfo} from "./../../../main";
import {ClassPropertyDefinition} from "./../../../definitions";
import {runDecoratorDefinitionTests} from "./../../test-helpers";

describe("class property decorator tests", () => {
    const code = `
function MyClassPropertyDecorator(target: Object, propertyKey: string) {
}

function MyClassPropertyAccessorDecorator(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    return descriptor;
}

class MyClass {
    @MyClassPropertyDecorator
    myProperty1: string;
    myProperty2: string;

    @MyClassPropertyAccessorDecorator
    get myProperty3() {
        return "";
    }

    set myProperty3(val: string) {
    }

    get myProperty4() {
        return "";
    }

    @MyClassPropertyAccessorDecorator
    set myProperty4(val: string) {
    }

    get myProperty5() {
        return "";
    }
}
`;

    const def = getStringInfo(code);

    function runHasDecoratorTests(property: ClassPropertyDefinition, decoratorName: string) {
        it("will have one decorator", () => {
            assert.equal(property.decorators.length, 1);
        });

        if (property.decorators.length === 1) {
            describe(decoratorName, () => {
                runDecoratorDefinitionTests(property.decorators[0], {
                    name: decoratorName,
                    arguments: []
                });
            });
        }
    }

    function runNotHasDecoratorTests(property: ClassPropertyDefinition) {
        it("will have zero decorators", () => {
            assert.equal(property.decorators.length, 0);
        });
    }

    it("will have 5 properties", () => {
        assert.equal(def.classes[0].properties.length, 5);
    });

    describe("myProperty1", () => {
        const p = def.classes[0].properties[0];
        runHasDecoratorTests(p, "MyClassPropertyDecorator");
    });

    describe("myProperty2", () => {
        const p = def.classes[0].properties[1];
        runNotHasDecoratorTests(p);
    });

    describe("myProperty3", () => {
        const p = def.classes[0].properties[2];
        runHasDecoratorTests(p, "MyClassPropertyAccessorDecorator");
    });

    describe("myProperty4", () => {
        const p = def.classes[0].properties[3];
        runHasDecoratorTests(p, "MyClassPropertyAccessorDecorator");
    });

    describe("myProperty5", () => {
        const p = def.classes[0].properties[4];
        runNotHasDecoratorTests(p);
    });
});
