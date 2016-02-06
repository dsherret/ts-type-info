import {InterfaceNewSignatureParameterDefinition} from "./../../../../definitions";
import {InterfaceNewSignatureParameterStructure} from "./../../structures";
import {runBaseParameterDefinitionTests} from "./../base";

export function runInterfaceNewSignatureParameterDefinitionTests(definition: InterfaceNewSignatureParameterDefinition, structure: InterfaceNewSignatureParameterStructure) {
    describe(`parameter ${structure.name}`, () => {
        runBaseParameterDefinitionTests(definition, structure);
    });
}
