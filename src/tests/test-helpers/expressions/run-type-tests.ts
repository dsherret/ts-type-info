import * as assert from "assert";
import {Type} from "./../../../expressions";
import {TypeStructure} from "./../structures";
import {runNamedDefinitionTests, runCallSignatureDefinitionTests, runBasePropertyDefinitionTests} from "./../definitions";
import {runTypeExpressionTests} from "./run-type-expression-tests";

export function runTypeTests(type: Type, structure: TypeStructure) {
    describe("type", () => {
        structure.callSignatures = structure.callSignatures || [];
        structure.typeArguments = structure.typeArguments || [];
        structure.properties = structure.properties || [];

        it(`should have the text of ${structure.text}`, () => {
            assert.equal(type.text, structure.text);
        });

        it(`should have the same number of call signatures`, () => {
            assert.equal(type.callSignatures.length, structure.callSignatures.length);
        });

        structure.callSignatures.forEach((callSignatureStructure, i) => {
            runCallSignatureDefinitionTests(type.callSignatures[i], callSignatureStructure);
        });

        it(`should have the same number of type arguments`, () => {
            assert.equal(type.typeArguments.length, structure.typeArguments.length);
        });

        structure.typeArguments.forEach((typeExpressionStructure, i) => {
            runTypeExpressionTests(type.typeArguments[i], typeExpressionStructure);
        });

        it(`should have the same number of properties`, () => {
            assert.equal(type.properties.length, structure.properties.length);
        });

        structure.properties.forEach((propertyStructure, i) => {
            runBasePropertyDefinitionTests(type.properties[i], propertyStructure);
        });

        if (structure.definition == null) {
            it(`should not have a definition`, () => {
                assert.equal(type.definition, null);
            });
        }
        else {
            it(`should have a definition`, () => {
                runNamedDefinitionTests(type.definition, structure.definition);
            });
        }
    });
}
