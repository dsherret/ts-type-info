import * as assert from "assert";
import {TypeParameteredTestStructure} from "./../../testStructures";
import {TypeParameteredDefinition} from "./../../../../definitions";
import {runTypeParameterDefinitionTests} from "./../general";

export function runTypeParameteredDefinitionTests(definition: TypeParameteredDefinition, structure: TypeParameteredTestStructure) {
    describe("type parameters", () => {
        structure.typeParameters = structure.typeParameters || [];

        it(`should have ${structure.typeParameters.length} type parameter(s)`, () => {
            assert.equal(definition.typeParameters.length, structure.typeParameters.length);
        });

        structure.typeParameters.forEach((param, i) => {
            runTypeParameterDefinitionTests(definition.typeParameters[i], param);
        });
    });
}
