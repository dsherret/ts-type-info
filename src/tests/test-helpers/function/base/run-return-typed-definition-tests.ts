import {IReturnTypedDefinition} from "./../../../../definitions";
import {runTypeExpressionTests} from "./../../expressions";

export function runReturnTypedDefinitionTests(definition: IReturnTypedDefinition, name: string) {
    runTypeExpressionTests(definition.returnTypeExpression, name);
}
