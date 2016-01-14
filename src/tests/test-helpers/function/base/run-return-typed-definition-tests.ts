import {ReturnTyped} from "./../../structures";
import {IReturnTypedDefinition} from "./../../../../definitions";
import {runTypeExpressionTests} from "./../../expressions";

export function runReturnTypedDefinitionTests(definition: IReturnTypedDefinition, structure: ReturnTyped) {
    describe("return type", () => {
        structure.returnTypeExpression = structure.returnTypeExpression || { text: "void" };

        runTypeExpressionTests(definition.returnTypeExpression, structure.returnTypeExpression);
    });
}
