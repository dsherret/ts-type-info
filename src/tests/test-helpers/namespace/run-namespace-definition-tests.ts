import {NamespaceDefinition} from "./../../../definitions";
import {Namespace} from "./../structures";
import {runNamedDefinitionTests, runExportableDefinitionTests, runModuledDefinitionTests} from "./../base";

export function runNamespaceDefinitionTests(definition: NamespaceDefinition, structure: Namespace) {
    describe(`namespace ${structure.name}`, () => {
        runNamedDefinitionTests(definition, structure);
        runExportableDefinitionTests(definition, structure);
        runModuledDefinitionTests(definition, structure);
    });
}
