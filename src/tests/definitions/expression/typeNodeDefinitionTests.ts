import * as assert from "assert";
import {TypeNodeDefinition} from "./../../../definitions";

describe("TypeNodeDefinition", () => {
    describe("#addTypeParameter()", () => {
        const def = new TypeNodeDefinition();
        it("should throw an error saying that addTypeParameter is not supported", () => {
            assert.throws(() => {
                def.addTypeParameter({ name: "T" });
            });
        });
    });

    describe("#addParameter()", () => {
        const def = new TypeNodeDefinition();
        it("should throw an error saying that addParameter is not supported", () => {
            assert.throws(() => {
                def.addParameter({ name: "a" });
            });
        });
    });
});
