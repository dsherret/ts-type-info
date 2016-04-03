import {DecoratorDefinition} from "./../../../definitions";
import {runExpressionDefinitionTests} from "./../../testHelpers";

describe("DecoratorDefinition", () => {
    describe("addExtends", () => {
        const d = new DecoratorDefinition();
        d.addArguments(`"test"`, "12");

        runExpressionDefinitionTests(d.arguments[0], {
            text: `"test"`
        });
        runExpressionDefinitionTests(d.arguments[1], {
            text: `12`
        });
    });
});
