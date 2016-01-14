﻿import {InterfaceMethod} from "./../structures";
import {InterfaceMethodDefinition} from "./../../../definitions";
import {runBaseFunctionDefinitionTests, runParameterDefinitionTests} from "./../function";

export function runInterfaceMethodDefinitionTests(definition: InterfaceMethodDefinition, structure: InterfaceMethod) {
    describe(`method ${structure.name}`, () => {
        runBaseFunctionDefinitionTests(runParameterDefinitionTests, definition, structure);
    });
}
