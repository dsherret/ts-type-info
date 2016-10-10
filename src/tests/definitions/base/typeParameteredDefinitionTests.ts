import * as assert from "assert";
import {ClassDefinition} from "./../../../definitions";
import {runNamedDefinitionTests, runTypeParameteredDefinitionTests} from "./../../testHelpers";

describe("TypeParameteredDefinition", () => {
    describe("#addTypeParameter()", () => {
        const d = new ClassDefinition();
        const returnedDef = d.addTypeParameter({
            name: "T"
        });
        d.addTypeParameter({
            name: "U",
            constraintType: "string"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, d.typeParameters[0]);
        });

        runTypeParameteredDefinitionTests(d, {
            typeParameters: [{
                name: "T"
            }, {
                name: "U",
                constraintType: { text: "string" }
            }]
        });
    });

    describe("#getTypeParameter()", () => {
        const c = new ClassDefinition();
        c.addTypeParameter({ name: "name1" });
        c.addTypeParameter({ name: "name2" });
        runNamedDefinitionTests(c.getTypeParameter("name2")!, { name: "name2" });
        runNamedDefinitionTests(c.getTypeParameter(p => p.name === "name2")!, { name: "name2" });
    });
});
