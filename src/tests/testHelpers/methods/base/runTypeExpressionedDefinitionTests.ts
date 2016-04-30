import {TypeExpressionedTestStructure} from "./../../testStructures";
import {TypeExpressionedDefinition} from "./../../../../definitions";
import {runTypeExpressionDefinitionTests} from "./../expression";

export function runTypeExpressionedDefinitionTests(definition: TypeExpressionedDefinition, structure: TypeExpressionedTestStructure) {
    describe("typeExpression", () => {
        runTypeExpressionDefinitionTests(definition.typeExpression, structure.typeExpression || { text: "any" });
    });
}
