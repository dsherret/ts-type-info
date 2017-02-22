import * as assert from "assert";
import {TypeDefinition} from "./../../../definitions";
import {runTypeDefinitionTests} from "./../../testHelpers";

describe("TypeDefinition", () => {
    describe("#getCallSignature()", () => {
        const def = new TypeDefinition();
        def.callSignatures.push({ parameters: [] } as any, { parameters: [{} as any] } as any);

        it("should get the correct call signature", () => {
            assert.equal(def.getCallSignature(c => c.parameters.length === 1), def.callSignatures[1]);
        });
    });

    describe("text", () => {
        const def = new TypeDefinition();
        def.text = "MyClass | MyOtherClass";
        runTypeDefinitionTests(def, {
            text: "MyClass | MyOtherClass",
            unionTypes: [{
                text: "MyClass"
            }, {
                text: "MyOtherClass"
            }]
        });
    });
});
