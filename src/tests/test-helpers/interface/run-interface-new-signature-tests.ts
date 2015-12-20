import {InterfaceNewSignature} from "./../structures";
import {InterfaceNewSignatureDefinition} from "./../../../definitions";
import {runParameteredDefinitionTests, runReturnTypedDefinitionTests} from "./../function";

export function runInterfaceNewSignatureDefinitionTests(definition: InterfaceNewSignatureDefinition, newSignature: InterfaceNewSignature) {
    runParameteredDefinitionTests(definition, newSignature.parameters);
    runReturnTypedDefinitionTests(definition, newSignature.returnType);
}
