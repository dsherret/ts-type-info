import {CallSignatureParameterStructure} from "./../../structures";
import {CallSignatureParameterDefinition} from "./../../../../definitions";
import {runBaseParameterDefinitionTests} from "./../base";

export function runCallSignatureParameterDefinitionTests(definition: CallSignatureParameterDefinition, structure: CallSignatureParameterStructure) {
    describe(`parameter ${structure.name}`, () => {
        runBaseParameterDefinitionTests(definition, structure);
    });
}
