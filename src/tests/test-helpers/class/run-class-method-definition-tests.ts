import {ClassMethod} from "./../structures";
import {ClassMethodDefinition} from "./../../../definitions/class/class-method-definition";
import {runBaseFunctionDefinitionTests} from "./../function/base/run-base-function-definition-tests";
import {runScopedDefinitionTests} from "./../base/run-scoped-definition-tests";
import {runParameteredDefinitionTests} from "./../function/run-parametered-definition-tests";

export function runClassMethodDefinitionTests(definition: ClassMethodDefinition, method: ClassMethod) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    describe(`method ${method.name}`, () => {
        runBaseFunctionDefinitionTests(definition, method);
        runScopedDefinitionTests(definition, method.scope);
    });
}
