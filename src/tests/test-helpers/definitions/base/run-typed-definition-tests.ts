import {ITypeExpressionedDefinition} from "./../../../../definitions";
import {runTypeExpressionTests} from "./../../expressions";
import {TypeExpressionedStructure} from "./../../structures";

export function runTypeExpressionedDefinitionTests(definition: ITypeExpressionedDefinition, structure: TypeExpressionedStructure) {
    runTypeExpressionTests(definition.typeExpression, structure.typeExpression);
}
