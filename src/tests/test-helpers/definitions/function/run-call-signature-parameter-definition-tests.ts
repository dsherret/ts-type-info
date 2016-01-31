import {CallSignatureParameterStructure} from "./../../structures";
import {CallSignatureParameterDefinition} from "./../../../../definitions";
import {runBaseParameterDefinitionTests} from "./../function";

export function runCallSignatureParameterDefinitionTests(definition: CallSignatureParameterDefinition, structure: CallSignatureParameterStructure) {
    describe(`parameter ${structure.name}`, () => {
        runBaseParameterDefinitionTests(definition, structure);
    });
}
