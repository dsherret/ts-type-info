import {ITypedDefinition} from "./../../../definitions";
import {runTypeExpressionTests} from "./../types";

export function runTypedDefinitionTests(definition: ITypedDefinition, name: string) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    runTypeExpressionTests(definition.typeExpression, name);
}
