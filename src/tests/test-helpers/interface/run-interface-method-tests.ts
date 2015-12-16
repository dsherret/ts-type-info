import {InterfaceMethod} from "./../structures";
import {InterfaceMethodDefinition} from "./../../../definitions";
import {runBaseFunctionDefinitionTests} from "./../function";

export function runInterfaceMethodDefinitionTests(definition: InterfaceMethodDefinition, func: InterfaceMethod) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    describe(`method ${func.name}`, () => {
        runBaseFunctionDefinitionTests(definition, func);
    });
}
