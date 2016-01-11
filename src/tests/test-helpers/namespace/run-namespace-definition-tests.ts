import {NamespaceDefinition} from "./../../../definitions";
import {Namespace} from "./../structures";
import {runNamedDefinitionTests, runModuledDefinitionTests} from "./../base";

export function runNamespaceDefinitionTests(definition: NamespaceDefinition, expected: Namespace) {
    runNamedDefinitionTests(definition, expected.name);
    runModuledDefinitionTests(definition, expected);
}
