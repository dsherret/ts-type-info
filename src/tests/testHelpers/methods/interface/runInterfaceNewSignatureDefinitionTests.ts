import {InterfaceNewSignatureTestStructure} from "./../../testStructures";
import {InterfaceNewSignatureDefinition} from "./../../../../definitions";
import {runParameteredDefinitionTests, runReturnTypedDefinitionTests, runParentedDefinitionTests} from "./../base";
import {runInterfaceNewSignatureParameterDefinitionTests} from "./runInterfaceNewSignatureParameterDefinitionTests";
import {ensureNotNull} from "./../../ensureNotNull";

export function runInterfaceNewSignatureDefinitionTests(definition: InterfaceNewSignatureDefinition, structure: InterfaceNewSignatureTestStructure) {
    describe(`new signature`, () => {
        ensureNotNull(definition, () => {
            runParameteredDefinitionTests(runInterfaceNewSignatureParameterDefinitionTests, definition, structure);
            runReturnTypedDefinitionTests(definition, structure);
            runParentedDefinitionTests(definition);
        });
    });
}
