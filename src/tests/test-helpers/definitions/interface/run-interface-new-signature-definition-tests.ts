import {InterfaceNewSignatureStructure} from "./../../structures";
import {InterfaceNewSignatureDefinition} from "./../../../../definitions";
import {runParameteredDefinitionTests, runReturnTypedDefinitionTests} from "./../function";
import {runInterfaceNewSignatureParameterDefinitionTests} from "./run-interface-new-signature-parameter-definition-tests";

export function runInterfaceNewSignatureDefinitionTests(definition: InterfaceNewSignatureDefinition, structure: InterfaceNewSignatureStructure) {
    runParameteredDefinitionTests(runInterfaceNewSignatureParameterDefinitionTests, definition, structure);
    runReturnTypedDefinitionTests(definition, structure);
}
