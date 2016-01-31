import {ClassMethodStructure} from "./../../../structures";
import {BaseClassMethodDefinition} from "./../../../../../definitions/class/base/base-class-method-definition";
import {runBaseFunctionDefinitionTests} from "./../../function/base/run-base-function-definition-tests";
import {runClassMethodParameterDefinitionTests} from "./../run-class-method-parameter-definition-tests";
import {runScopedDefinitionTests} from "./run-scoped-definition-tests";

export function runBaseClassMethodDefinitionTests<T extends BaseClassMethodDefinition<T>>(definition: T, structure: ClassMethodStructure) {
    runBaseFunctionDefinitionTests(runClassMethodParameterDefinitionTests, definition, structure);
    runScopedDefinitionTests(definition, structure);
}
