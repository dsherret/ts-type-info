import {ClassDefinition} from "./../../../definitions";
import {runNamedDefinitionTests, runTypeParameteredDefinitionTests} from "./../../testHelpers";

describe("TypeParameteredDefinition", () => {
    describe("addTypeParameters", () => {
        const d = new ClassDefinition();
        d.addTypeParameters({
            name: "T"
        }, {
            name: "U",
            constraintType: "string"
        });

        runTypeParameteredDefinitionTests(d, {
            typeParameters: [{
                name: "T"
            }, {
                name: "U",
                constraintTypeExpression: { text: "string" }
            }]
        });
    });

    describe("getTypeParameter", () => {
        const c = new ClassDefinition();
        c.addTypeParameters({ name: "name1" }, { name: "name2" });
        runNamedDefinitionTests(c.getTypeParameter("name2"), { name: "name2" });
        runNamedDefinitionTests(c.getTypeParameter(d => d.name === "name2"), { name: "name2" });
    });
});
