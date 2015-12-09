import {Function} from "./../structures";
import {FunctionDefinition} from "./../../../definitions/function/function-definition";
import {runNamedDefinitionTests} from "./../base/run-named-definition-tests";
import {runReturnTypedDefinitionTests} from "./../function/run-return-typed-definition-tests";
import {runParameteredDefinitionTests} from "./../function/run-parametered-definition-tests";

export function runFunctionDefinitionTests(definition: FunctionDefinition, func: Function) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    describe(`method ${func.name}`, () => {
        runNamedDefinitionTests(definition, func.name);
        runReturnTypedDefinitionTests(definition, func.returnType);
        runParameteredDefinitionTests(definition, func.parameters);
    });
}
