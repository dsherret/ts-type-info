import {DefaultExpressionedTestStructure} from "./../../testStructures";
import {DefaultExpressionedDefinition} from "./../../../../definitions";
import {runExpressionTests} from "./../../expressions";

export function runDefaultExpressionedDefinitionTests(definition: DefaultExpressionedDefinition, structure: DefaultExpressionedTestStructure) {
    describe("defaultExpression", () => {
        runExpressionTests(definition.defaultExpression, structure.defaultExpression);
    });
}
