import * as assert from "assert";
import {ClassPropertyStructure} from "./../../structures";
import {ClassPropertyDefinition} from "./../../../../definitions";
import {runPropertyDefinitionTests} from "./../base";

export function runClassPropertyDefinitionTests(definition: ClassPropertyDefinition, structure: ClassPropertyStructure) {
    describe(`property ${structure.name}`, () => {
        runPropertyDefinitionTests(definition, structure);

        it(`should be ${structure.isAccessor ? "an accessor" : "not an accessor"}`, () => {
            assert.equal(definition.isAccessor, structure.isAccessor || false);
        });

        it(`should be ${structure.isReadonly ? "readonly" : "not readonly"}`, () => {
            assert.equal(definition.isReadonly, structure.isReadonly || false);
        });
    });
}
