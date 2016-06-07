import {ClassStaticMethodDefinition} from "./../../../definitions";
import {runClassStaticMethodParameterDefinitionTests} from "./../../testHelpers";

describe("ClassStaticMethod", () => {
    describe("addParameters", () => {
        const c = new ClassStaticMethodDefinition();

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

        runClassStaticMethodParameterDefinitionTests(c.parameters[0], {
            name: "myParameter",
            typeExpression: { text: "string[]", isArray: true, arrayElementTypeExpression: { text: "string" } },
            defaultExpression: { text: `["test"]` },
            isOptional: true,
            isRestParameter: true,
            decorators: [{
                name: "decorator"
            }]
        });

        runClassStaticMethodParameterDefinitionTests(c.parameters[1], {
            name: "mySecondParameter"
        });
    });
});
