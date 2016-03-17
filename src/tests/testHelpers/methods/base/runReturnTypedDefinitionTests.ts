import {ReturnTypedTestStructure} from "./../../testStructures";
import {ReturnTypedDefinition} from "./../../../../definitions";
import {runTypeExpressionTests} from "./../expressions";

export function runReturnTypedDefinitionTests(definition: ReturnTypedDefinition, structure: ReturnTypedTestStructure) {
    describe("return type", () => {
        structure.returnTypeExpression = structure.returnTypeExpression || { text: "void" };

        runTypeExpressionTests(definition.returnTypeExpression, structure.returnTypeExpression);
    });
}
