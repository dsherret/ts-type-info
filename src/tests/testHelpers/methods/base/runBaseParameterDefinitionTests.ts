import * as assert from "assert";
import {BaseParameterTestStructure} from "./../../testStructures";
import {BaseParameterDefinition} from "./../../../../definitions";
import {runObjectPropertyDefinitionTests} from "./../general/runObjectPropertyDefinitionTests";
import {runBaseDefinitionTests} from "./runBaseDefinitionTests";
import {runNamedDefinitionTests} from "./runNamedDefinitionTests";
import {runOptionalDefinitionTests} from "./runOptionalDefinitionTests";
import {runTypedDefinitionTests} from "./runTypedDefinitionTests";
import {runDefaultExpressionedDefinitionTests} from "./runDefaultExpressionedDefinitionTests";

export function runBaseParameterDefinitionTests(definition: BaseParameterDefinition, structure: BaseParameterTestStructure) {
    runBaseDefinitionTests(definition, structure);
    runNamedDefinitionTests(definition, structure);
    runOptionalDefinitionTests(definition, structure);
    runTypedDefinitionTests(definition, structure);
    runDefaultExpressionedDefinitionTests(definition, structure);

    it(`should ${structure.isRestParameter ? "be" : "not be"} a rest parameter`, () => {
        assert.equal(definition.isRestParameter, typeof structure.isRestParameter === "boolean" ? structure.isRestParameter : false);
    });

    it(`should have the same number of destructuringProperties`, () => {
        assert.equal(definition.destructuringProperties.length, (structure.destructuringProperties || []).length);
    });

    (structure.destructuringProperties || []).forEach((p, i) => {
        runObjectPropertyDefinitionTests(definition.destructuringProperties[i], p);
    });
}
