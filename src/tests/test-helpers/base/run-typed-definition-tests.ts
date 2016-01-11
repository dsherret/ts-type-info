import {ITypedDefinition} from "./../../../definitions";
import {runTypeExpressionTests} from "./../expressions";

export function runTypedDefinitionTests(definition: ITypedDefinition, name: string) {
    if (definition == null) {
        throw "Typed definition should not be null.";
    }

    runTypeExpressionTests(definition.typeExpression, name);
}
