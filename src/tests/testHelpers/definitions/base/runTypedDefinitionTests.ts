import {TypeExpressionedDefinition} from "./../../../../definitions";
import {runTypeExpressionTests} from "./../../expressions";
import {TypeExpressionedTestStructure} from "./../../testStructures";

export function runTypeExpressionedDefinitionTests(definition: TypeExpressionedDefinition, structure: TypeExpressionedTestStructure) {
    runTypeExpressionTests(definition.typeExpression, structure.typeExpression);
}
