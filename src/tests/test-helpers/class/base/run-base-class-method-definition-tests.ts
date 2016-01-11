import {ClassMethod} from "./../../structures";
import {BaseClassMethodDefinition} from "./../../../../definitions/class/base/base-class-method-definition";
import {runBaseFunctionDefinitionTests} from "./../../function/base/run-base-function-definition-tests";
import {runScopedDefinitionTests} from "./../../base";

export function runBaseClassMethodDefinitionTests(definition: BaseClassMethodDefinition, method: ClassMethod) {
    runBaseFunctionDefinitionTests(definition, method);
    runScopedDefinitionTests(definition, method.scope);
}
