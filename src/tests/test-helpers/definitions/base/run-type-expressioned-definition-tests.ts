import {TypeExpressionedStructure} from "./../../structures";
import {ITypeExpressionedDefinition} from "./../../../../definitions";
import {runTypeExpressionTests} from "./../../expressions";

export function runTypeExpressionedDefinitionTests(definition: ITypeExpressionedDefinition, structure: TypeExpressionedStructure) {
    describe("typeExpression", () => {
        runTypeExpressionTests(definition.typeExpression, structure.typeExpression);
    });
}
