import {DefaultExpressionedTestStructure} from "./../../test-structures";
import {IDefaultExpressionedDefinition} from "./../../../../definitions";
import {runExpressionTests} from "./../../expressions";

export function runDefaultExpressionedDefinitionTests(definition: IDefaultExpressionedDefinition, structure: DefaultExpressionedTestStructure) {
    describe("defaultExpression", () => {
        runExpressionTests(definition.defaultExpression, structure.defaultExpression);
    });
}
