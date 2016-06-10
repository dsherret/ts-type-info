import {VariableDefinition} from "./../../../definitions";
import {runTypedDefinitionTests} from "./../../testHelpers";

describe("TypedDefinition", () => {
    describe("setType", () => {
        const v = new VariableDefinition();
        v.setType("string");

        runTypedDefinitionTests(v, { type: { text: "string" } });
    });
});
