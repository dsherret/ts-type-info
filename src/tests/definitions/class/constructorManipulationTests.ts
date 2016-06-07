import {ClassConstructorDefinition, ClassConstructorParameterScope} from "./../../../definitions";
import {runClassConstructorParameterDefinitionTests} from "./../../testHelpers";

describe("ClassConstructor", () => {
    describe("addParameters", () => {
        const c = new ClassConstructorDefinition();

        c.addParameters({
            name: "myParameter",
            type: "string[]",
            defaultExpression: `["test"]`,
            isOptional: true,
            isRestParameter: true,
            scope: ClassConstructorParameterScope.Private
        }, {
            name: "mySecondParameter"
        });

        runClassConstructorParameterDefinitionTests(c.parameters[0], {
            name: "myParameter",
            typeExpression: { text: "string[]", isArray: true, arrayElementTypeExpression: { text: "string" } },
            defaultExpression: { text: `["test"]` },
            isOptional: true,
            isRestParameter: true,
            scope: ClassConstructorParameterScope.Private
        });

        runClassConstructorParameterDefinitionTests(c.parameters[1], {
            name: "mySecondParameter"
        });
    });
});
