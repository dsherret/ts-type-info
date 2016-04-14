import {ClassDefinition} from "./../../../definitions";
import {runNamedDefinitionTests, runDecoratableDefinitionTests} from "./../../testHelpers";

describe("DecoratableDefinition", () => {
    describe("addDecorators", () => {
        const c = new ClassDefinition();
        c.addDecorators({
            name: "decorator1",
            arguments: ["5", `"test"`]
        }, {
            name: "decorator2"
        });

        runDecoratableDefinitionTests(c, {
            decorators: [{
                name: "decorator1",
                arguments: [{
                    text: "5"
                }, {
                    text: `"test"`
                }]
            }, {
                name: "decorator2"
            }]
        });
    });

    describe("getDecorator", () => {
        const c = new ClassDefinition();
        c.addDecorators({ name: "dec1" }, { name: "dec2" });
        runNamedDefinitionTests(c.getDecorator("dec2"), { name: "dec2" });
        runNamedDefinitionTests(c.getDecorator(d => d.name === "dec2"), { name: "dec2" });
    });
});
