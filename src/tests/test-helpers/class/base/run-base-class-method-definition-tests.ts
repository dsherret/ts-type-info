import {ClassMethodStructure} from "./../../structures";
import {BaseClassMethodDefinition} from "./../../../../definitions/class/base/base-class-method-definition";
import {runBaseFunctionDefinitionTests} from "./../../function/base/run-base-function-definition-tests";
import {runScopedDefinitionTests} from "./../../base";
import {runClassMethodParameterDefinitionTests} from "./../run-class-method-parameter-definition-tests";

export function runBaseClassMethodDefinitionTests(definition: BaseClassMethodDefinition, structure: ClassMethodStructure) {
    runBaseFunctionDefinitionTests(runClassMethodParameterDefinitionTests, definition, structure);
    runScopedDefinitionTests(definition, structure);
}
