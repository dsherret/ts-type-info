import {Function} from "./../structures";
import {FunctionDefinition} from "./../../../definitions";
import {runExportableDefinitionTests} from "./../base";
import {runBaseFunctionDefinitionTests} from "./base";

export function runFunctionDefinitionTests(definition: FunctionDefinition, func: Function) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    describe(`function ${func.name}`, () => {
        runBaseFunctionDefinitionTests(definition, func);
        runExportableDefinitionTests(definition, func.isExported);
    });
}
