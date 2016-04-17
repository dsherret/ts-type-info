import {FunctionDefinition} from "./../../../definitions";
import {runCallSignatureDefinitionTests} from "./../../testHelpers";

describe("BaseFunctionDefinition", () => {
    describe("addCallSignatures", () => {
        const f = new FunctionDefinition();
        f.addOverloadSignatures({
            returnType: "string",
            typeParameters: [{ name: "T" }],
            parameters: [{ name: "myParam" }],
            minArgumentCount: 1
        }, {
            returnType: "number"
        });

        runCallSignatureDefinitionTests(f.overloadSignatures[0], {
            returnTypeExpression: { text: "string" },
            typeParameters: [{ name: "T" }],
            parameters: [{ name: "myParam" }],
            minArgumentCount: 1
        });

        runCallSignatureDefinitionTests(f.overloadSignatures[1], {
            returnTypeExpression: { text: "number" }
        });
    });
});
