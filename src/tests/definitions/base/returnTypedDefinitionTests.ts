import {FunctionDefinition} from "./../../../definitions";
import {runTypeNodeDefinitionTests} from "./../../testHelpers";

describe("ReturnTypedDefinition", () => {
    describe("setReturnTypedExpression", () => {
        const func = new FunctionDefinition();
        func.setReturnType("5");

        runTypeNodeDefinitionTests(func.returnType, { text: "5" });
    });
});
