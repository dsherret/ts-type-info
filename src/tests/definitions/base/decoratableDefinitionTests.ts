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
        c.addDecorators({ name: "name1" }, { name: "name2" });
        runNamedDefinitionTests(c.getDecorator("name2"), { name: "name2" });
        runNamedDefinitionTests(c.getDecorator(d => d.name === "name2"), { name: "name2" });
    });
});
