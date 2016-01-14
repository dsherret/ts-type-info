import * as assert from "assert";
import {TypeParameteredStructure} from "./../../structures";
import {ITypeParameteredDefinition} from "./../../../../definitions";
import {runTypeParameterDefinitionTests} from "./run-type-parameter-definition-tests";

export function runTypeParameteredDefinitionTests(definition: ITypeParameteredDefinition, structure: TypeParameteredStructure) {
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
