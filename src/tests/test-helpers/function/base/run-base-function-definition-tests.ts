import {Function} from "./../../structures";
import {BaseFunctionDefinition, BaseParameterDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests} from "./../../base";
import {runReturnTypedDefinitionTests} from "./run-return-typed-definition-tests";
import {runParameteredDefinitionTests} from "./run-parametered-definition-tests";

export function runBaseFunctionDefinitionTests<T extends BaseParameterDefinition>(definition: BaseFunctionDefinition<T>, func: Function) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    runNamedDefinitionTests(definition, func.name);
    runReturnTypedDefinitionTests(definition, func.returnType);
    runParameteredDefinitionTests(definition, func.parameters);
}
