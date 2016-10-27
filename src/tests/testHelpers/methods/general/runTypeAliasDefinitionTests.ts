import {TypeAliasTestStructure} from "./../../testStructures";
import {TypeAliasDefinition} from "./../../../../definitions";
import {runBaseDefinitionTests, runNamedDefinitionTests, runExportableDefinitionTests, runTypedDefinitionTests,
        runTypeParameteredDefinitionTests, runAmbientableDefinitionTests, runOrderableDefinitionTests, runDocumentationedDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensureNotNull";

export function runTypeAliasDefinitionTests(definition: TypeAliasDefinition, structure: TypeAliasTestStructure) {
    describe(`type expression ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            structure.isAmbient = structure.isAmbient == null ? true : structure.isAmbient;
            if (structure.type == null) {
                structure.type = { text: "string" }; // default always to expect a string (for simplicity)
            }

            runBaseDefinitionTests(definition, structure);
            runNamedDefinitionTests(definition, structure);
            runExportableDefinitionTests(definition, structure);
            runTypedDefinitionTests(definition, structure);
            runAmbientableDefinitionTests(definition, structure);
            runTypeParameteredDefinitionTests(definition, structure);
            runOrderableDefinitionTests(definition, structure);
            runDocumentationedDefinitionTests(definition, structure);
        });
    });
}
