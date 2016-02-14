import {InterfaceNewSignatureStructure} from "./../../structures";
import {InterfaceNewSignatureDefinition} from "./../../../../definitions";
import {runParameteredDefinitionTests, runReturnTypedDefinitionTests, runParentedDefinitionTests} from "./../base";
import {runInterfaceNewSignatureParameterDefinitionTests} from "./run-interface-new-signature-parameter-definition-tests";
import {ensureNotNull} from "./../../ensure-not-null";

export function runInterfaceNewSignatureDefinitionTests(definition: InterfaceNewSignatureDefinition, structure: InterfaceNewSignatureStructure) {
    describe(`new signature`, () => {
        ensureNotNull(definition, () => {
            runParameteredDefinitionTests(runInterfaceNewSignatureParameterDefinitionTests, definition, structure);
            runReturnTypedDefinitionTests(definition, structure);
            runParentedDefinitionTests(definition);
        });
    });
}
