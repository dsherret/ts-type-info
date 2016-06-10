import {FunctionDefinition} from "./../../../definitions";
import {runTypeDefinitionTests} from "./../../testHelpers";

describe("ReturnTypedDefinition", () => {
    describe("setReturnTypedExpression", () => {
        const func = new FunctionDefinition();
        func.setReturnType("5");

        runTypeDefinitionTests(func.returnType, { text: "5" });
    });
});
