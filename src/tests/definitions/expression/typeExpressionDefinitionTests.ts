import * as assert from "assert";
import {TypeExpressionDefinition} from "./../../../definitions";

describe("TypeExpressionDefinition", () => {
    describe("#getType()", () => {
        const def = new TypeExpressionDefinition();
        def.types.push({ text: "type1" } as any, { text: "type2" } as any);

        it("should get the correct type", () => {
            assert.equal(def.getType(n => n.text === "type2"), def.types[1]);
        });
    });
});
