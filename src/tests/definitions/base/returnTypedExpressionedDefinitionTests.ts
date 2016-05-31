import {FunctionDefinition} from "./../../../definitions";
import {runTypeExpressionDefinitionTests} from "./../../testHelpers";

describe("ReturnTypedExpressionedDefinition", () => {
    describe("setReturnTypedExpression", () => {
        const func = new FunctionDefinition();
        func.setReturnTypeExpression("5");

        runTypeExpressionDefinitionTests(func.returnTypeExpression, { text: "5" });
    });
});
