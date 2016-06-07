import {TypeExpressionedTestStructure} from "./../../testStructures";
import {TypeExpressionedDefinition} from "./../../../../definitions";
import {runTypeExpressionDefinitionTests} from "./../expression";

export function runTypeExpressionedDefinitionTests(definition: TypeExpressionedDefinition, structure: TypeExpressionedTestStructure) {
    runTypeExpressionDefinitionTests(definition.typeExpression, structure.typeExpression || { text: "any" });
}
