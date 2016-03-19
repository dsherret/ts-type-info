import {TypeExpressionedTestStructure} from "./../../testStructures";
import {TypeExpressionedDefinition} from "./../../../../definitions";
import {runTypeExpressionTests} from "./../expressions";

export function runTypeExpressionedDefinitionTests(definition: TypeExpressionedDefinition, structure: TypeExpressionedTestStructure) {
    describe("typeExpression", () => {
        runTypeExpressionTests(definition.typeExpression, structure.typeExpression || { text: "any" });
    });
}
