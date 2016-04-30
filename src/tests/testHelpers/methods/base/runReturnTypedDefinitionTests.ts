import {ReturnTypedTestStructure} from "./../../testStructures";
import {ReturnTypedDefinition} from "./../../../../definitions";
import {runTypeExpressionDefinitionTests} from "./../expression";

export function runReturnTypedDefinitionTests(definition: ReturnTypedDefinition, structure: ReturnTypedTestStructure) {
    describe("return type", () => {
        structure.returnTypeExpression = structure.returnTypeExpression || { text: "void" };

        runTypeExpressionDefinitionTests(definition.returnTypeExpression, structure.returnTypeExpression);
    });
}
