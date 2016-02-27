import {InterfaceMethodParameterTestStructure} from "./../../test-structures";
import {InterfaceMethodParameterDefinition} from "./../../../../definitions";
import {ensureNotNull} from "./../../ensure-not-null";
import {runBaseParameterDefinitionTests} from "./../base";

export function runInterfaceMethodParameterDefinitionTests(definition: InterfaceMethodParameterDefinition, structure: InterfaceMethodParameterTestStructure) {
    describe(`parameter ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBaseParameterDefinitionTests(definition, structure);
        });
    });
}
