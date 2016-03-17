import {InterfaceNewSignatureParameterDefinition} from "./../../../../definitions";
import {InterfaceNewSignatureParameterTestStructure} from "./../../testStructures";
import {runBaseParameterDefinitionTests} from "./../base";

export function runInterfaceNewSignatureParameterDefinitionTests(definition: InterfaceNewSignatureParameterDefinition, structure: InterfaceNewSignatureParameterTestStructure) {
    describe(`parameter ${structure.name}`, () => {
        runBaseParameterDefinitionTests(definition, structure);
    });
}
