import * as assert from "assert";
import {ClassDefinition} from "./../../../definitions";
import {runNamedDefinitionTests, runDecoratableDefinitionTests} from "./../../testHelpers";

describe("DecoratableDefinition", () => {
    describe("#addDecorator()", () => {
        const c = new ClassDefinition();
        const returnedDef = c.addDecorator({
            name: "decorator1",
            arguments: ["5", `"test"`]
        });
        c.addDecorator({
            name: "decorator2",
            isDecoratorFactory: true
        });
        c.addDecorator({
            name: "decorator3"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, c.decorators[0]);
        });

        runDecoratableDefinitionTests(c, {
            decorators: [{
                name: "decorator1",
                arguments: [{
                    text: "5"
                }, {
                    text: `"test"`
                }],
                isDecoratorFactory: true
            }, {
                name: "decorator2",
                isDecoratorFactory: true
            }, {
                name: "decorator3"
            }]
        });
    });

    describe("#getDecorator()", () => {
        const c = new ClassDefinition();
        c.addDecorator({ name: "name1" });
        c.addDecorator({ name: "name2" });
        runNamedDefinitionTests(c.getDecorator("name2")!, { name: "name2" });
        runNamedDefinitionTests(c.getDecorator(d => d.name === "name2")!, { name: "name2" });
    });
});
