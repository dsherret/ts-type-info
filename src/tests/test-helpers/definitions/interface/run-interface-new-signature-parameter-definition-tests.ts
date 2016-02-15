import {InterfaceNewSignatureParameterDefinition} from "./../../../../definitions";
import {InterfaceNewSignatureParameterTestStructure} from "./../../test-structures";
import {runBaseParameterDefinitionTests} from "./../base";

export function runInterfaceNewSignatureParameterDefinitionTests(definition: InterfaceNewSignatureParameterDefinition, structure: InterfaceNewSignatureParameterTestStructure) {
    describe(`parameter ${structure.name}`, () => {
        runBaseParameterDefinitionTests(definition, structure);
    });
}
