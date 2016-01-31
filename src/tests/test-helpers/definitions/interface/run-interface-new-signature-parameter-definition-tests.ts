import {InterfaceNewSignatureParameterStructure} from "./../../structures";
import {InterfaceNewSignatureParameterDefinition} from "./../../../../definitions";
import {runBaseParameterDefinitionTests} from "./../function";

export function runInterfaceNewSignatureParameterDefinitionTests(definition: InterfaceNewSignatureParameterDefinition, structure: InterfaceNewSignatureParameterStructure) {
    describe(`parameter ${structure.name}`, () => {
        runBaseParameterDefinitionTests(definition, structure);
    });
}
