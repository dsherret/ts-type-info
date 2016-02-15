import * as assert from "assert";
import {ClassConstructorParameterStructure} from "./../../structures";
import {ClassConstructorParameterDefinition, ClassConstructorParameterScope} from "./../../../../definitions";
import {runBaseParameterDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensure-not-null";

export function runClassConstructorParameterDefinitionTests(definition: ClassConstructorParameterDefinition, structure: ClassConstructorParameterStructure) {
    describe(`parameter ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            structure.scope = structure.scope || ClassConstructorParameterScope.None;
            runBaseParameterDefinitionTests(definition, structure);

            it(`should have a scope of ${structure.scope}`, () => {
                assert.equal(definition.scope, structure.scope);
            });
        });
    });
}
