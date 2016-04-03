import {ClassMethodDefinition} from "./../../../definitions";
import {runClassMethodParameterDefinitionTests} from "./../../testHelpers";

describe("ClassMethod", () => {
    describe("addParameters", () => {
        const c = new ClassMethodDefinition();

        c.addParameters({
            name: "myParameter",
            type: "string[]",
            defaultExpression: `["test"]`,
            isOptional: true,
            isRestParameter: true,
            decorators: [{
                name: "decorator"
            }]
        }, {
            name: "mySecondParameter"
        });

        runClassMethodParameterDefinitionTests(c.parameters[0], {
            name: "myParameter",
            typeExpression: { text: "string[]" },
            defaultExpression: { text: `["test"]` },
            isOptional: true,
            isRestParameter: true,
            decorators: [{
                name: "decorator"
            }]
        });

        runClassMethodParameterDefinitionTests(c.parameters[1], {
            name: "mySecondParameter"
        });
    });
});
