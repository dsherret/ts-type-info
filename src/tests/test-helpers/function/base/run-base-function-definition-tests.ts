import {Function} from "./../../structures";
import {BaseFunctionDefinition} from "./../../../../definitions/function/base/base-function-definition";
import {runNamedDefinitionTests} from "./../../base/run-named-definition-tests";
import {runReturnTypedDefinitionTests} from "./../run-return-typed-definition-tests";
import {runParameteredDefinitionTests} from "./../run-parametered-definition-tests";

export function runBaseFunctionDefinitionTests(definition: BaseFunctionDefinition, func: Function) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    describe(`method ${func.name}`, () => {
        runNamedDefinitionTests(definition, func.name);
        runReturnTypedDefinitionTests(definition, func.returnType);
        runParameteredDefinitionTests(definition, func.parameters);
    });
}
