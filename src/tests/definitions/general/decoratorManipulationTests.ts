import * as assert from "assert";
import {DecoratorDefinition} from "./../../../definitions";
import {runExpressionDefinitionTests} from "./../../testHelpers";

describe("DecoratorDefinition", () => {
    describe("#addArgument()", () => {
        const d = new DecoratorDefinition();
        const returnedDef = d.addArgument(`"test"`);
        d.addArgument("12");

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, d.arguments[0]);
        });

        runExpressionDefinitionTests(d.arguments[0], {
            text: `"test"`
        });
        runExpressionDefinitionTests(d.arguments[1], {
            text: `12`
        });
    });
});
