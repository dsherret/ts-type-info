import {InterfaceNewSignature} from "./../structures";
import {InterfaceNewSignatureDefinition} from "./../../../definitions";
import {runParameteredDefinitionTests, runParameterDefinitionTests, runReturnTypedDefinitionTests} from "./../function";

export function runInterfaceNewSignatureDefinitionTests(definition: InterfaceNewSignatureDefinition, structure: InterfaceNewSignature) {
    runParameteredDefinitionTests(runParameterDefinitionTests, definition, structure);
    runReturnTypedDefinitionTests(definition, structure);
}
