import {ClassDefinition} from "./../../../definitions";
import {runDecoratableDefinitionTests} from "./../../testHelpers";

describe("DecoratableDefinition", () => {
    describe("addDecorators", () => {
        const d = new ClassDefinition();
        d.addDecorators({
            name: "decorator1",
            arguments: ["5", `"test"`]
        }, {
            name: "decorator2"
        });

        runDecoratableDefinitionTests(d, {
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
});
