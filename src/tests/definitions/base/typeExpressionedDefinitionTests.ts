import {VariableDefinition} from "./../../../definitions";
import {runTypeExpressionedDefinitionTests} from "./../../testHelpers";

describe("TypeExpressionedDefinition", () => {
    describe("setTypeExpression", () => {
        const v = new VariableDefinition();
        v.setTypeExpression("string");

        runTypeExpressionedDefinitionTests(v, { typeExpression: { text: "string" } });
    });
});
