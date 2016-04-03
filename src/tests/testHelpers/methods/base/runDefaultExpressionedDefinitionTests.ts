import {DefaultExpressionedTestStructure} from "./../../testStructures";
import {DefaultExpressionedDefinition} from "./../../../../definitions";
import {runExpressionDefinitionTests} from "./../expressions";

export function runDefaultExpressionedDefinitionTests(definition: DefaultExpressionedDefinition, structure: DefaultExpressionedTestStructure) {
    describe("defaultExpression", () => {
        runExpressionDefinitionTests(definition.defaultExpression, structure.defaultExpression);
    });
}
