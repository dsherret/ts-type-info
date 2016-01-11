import {NamespaceDefinition} from "./../../../definitions";
import {Namespace} from "./../structures";
import {runNamedDefinitionTests, runExportableDefinitionTests, runModuledDefinitionTests} from "./../base";

export function runNamespaceDefinitionTests(definition: NamespaceDefinition, expected: Namespace) {
    runNamedDefinitionTests(definition, expected.name);
    runExportableDefinitionTests(definition, expected.isExported);
    runModuledDefinitionTests(definition, expected);
}
