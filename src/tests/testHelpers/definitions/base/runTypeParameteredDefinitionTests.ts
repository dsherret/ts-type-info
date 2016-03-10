﻿import * as assert from "assert";
import {TypeParameteredTestStructure} from "./../../testStructures";
import {ITypeParameteredDefinition} from "./../../../../definitions";
import {runTypeParameterDefinitionTests} from "./../general";
import {ensureNotNull} from "./../../EnsureNotNull";

export function runTypeParameteredDefinitionTests(definition: ITypeParameteredDefinition, structure: TypeParameteredTestStructure) {
    describe("type parameters", () => {
        structure.typeParameters = structure.typeParameters || [];

        it(`should have ${structure.typeParameters.length} type parameter(s)`, () => {
            assert.equal(definition.typeParameters.length, structure.typeParameters.length);
        });

        structure.typeParameters.forEach((param, i) => {
            ensureNotNull(definition.typeParameters[i], () => {
                runTypeParameterDefinitionTests(definition.typeParameters[i], param);
            });
        });
    });
}
