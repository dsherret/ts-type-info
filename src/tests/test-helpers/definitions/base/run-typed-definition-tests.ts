import {ITypeExpressionedDefinition} from "./../../../../definitions";
import {runTypeExpressionTests} from "./../../expressions";
import {TypeExpressionedTestStructure} from "./../../test-structures";

export function runTypeExpressionedDefinitionTests(definition: ITypeExpressionedDefinition, structure: TypeExpressionedTestStructure) {
    runTypeExpressionTests(definition.typeExpression, structure.typeExpression);
}
