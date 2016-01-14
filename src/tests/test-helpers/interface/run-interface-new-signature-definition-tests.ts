import {InterfaceNewSignatureStructure} from "./../structures";
import {InterfaceNewSignatureDefinition} from "./../../../definitions";
import {runParameteredDefinitionTests, runParameterDefinitionTests, runReturnTypedDefinitionTests} from "./../function";

export function runInterfaceNewSignatureDefinitionTests(definition: InterfaceNewSignatureDefinition, structure: InterfaceNewSignatureStructure) {
    runParameteredDefinitionTests(runParameterDefinitionTests, definition, structure);
    runReturnTypedDefinitionTests(definition, structure);
}
