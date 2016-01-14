import {NamespaceDefinition} from "./../../../../definitions";
import {NamespaceStructure} from "./../../structures";
import {runNamedDefinitionTests, runExportableDefinitionTests, runModuledDefinitionTests} from "./../base";

export function runNamespaceDefinitionTests(definition: NamespaceDefinition, structure: NamespaceStructure) {
    describe(`namespace ${structure.name}`, () => {
        runNamedDefinitionTests(definition, structure);
        runExportableDefinitionTests(definition, structure);
        runModuledDefinitionTests(definition, structure);
    });
}
