import {InterfaceMethodDefinition} from "./../../../definitions";
import {runInterfaceMethodParameterDefinitionTests} from "./../../testHelpers";

describe("InterfaceMethodDefinition", () => {
    describe("addParameters", () => {
        const c = new InterfaceMethodDefinition();

        c.addParameters({
            name: "myParameter",
            type: "string[]",
            defaultExpression: `["test"]`,
            isOptional: true,
            isRestParameter: true
        }, {
            name: "mySecondParameter"
        });

        runInterfaceMethodParameterDefinitionTests(c.parameters[0], {
            name: "myParameter",
            type: { text: "string[]", isArray: true, arrayElementType: { text: "string" } },
            defaultExpression: { text: `["test"]` },
            isOptional: true,
            isRestParameter: true
        });

        runInterfaceMethodParameterDefinitionTests(c.parameters[1], {
            name: "mySecondParameter"
        });
    });
});
