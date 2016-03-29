import {ClassDefinition} from "./../../../definitions";
import {runTypeParameteredDefinitionTests} from "./../../testHelpers";

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
});
