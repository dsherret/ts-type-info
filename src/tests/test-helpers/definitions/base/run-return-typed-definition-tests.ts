import {ReturnTypedTestStructure} from "./../../test-structures";
import {IReturnTypedDefinition} from "./../../../../definitions";
import {runTypeExpressionTests} from "./../../expressions";

export function runReturnTypedDefinitionTests(definition: IReturnTypedDefinition, structure: ReturnTypedTestStructure) {
    describe("return type", () => {
        structure.returnTypeExpression = structure.returnTypeExpression || { text: "void" };

        runTypeExpressionTests(definition.returnTypeExpression, structure.returnTypeExpression);
    });
}
