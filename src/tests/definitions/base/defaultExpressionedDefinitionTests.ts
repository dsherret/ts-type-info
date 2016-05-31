import {VariableDefinition} from "./../../../definitions";
import {runDefaultExpressionedDefinitionTests} from "./../../testHelpers";

describe("DefaultExpressionedDefinition", () => {
    describe("setDefaultExpression", () => {
        const v = new VariableDefinition();
        v.setDefaultExpression("5");

        runDefaultExpressionedDefinitionTests(v, { defaultExpression: { text: "5" } });
    });
});
