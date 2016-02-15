import * as assert from "assert";
import {Type} from "./../../../expressions";
import {TypeTestStructure} from "./../test-structures";
import {runNamedDefinitionTests, runCallSignatureDefinitionTests, runBasePropertyDefinitionTests} from "./../definitions";
import {runTypeExpressionTests} from "./run-type-expression-tests";
import {ensureNotNull} from "./../ensure-not-null";

export function runTypeTests(type: Type, structure: TypeTestStructure) {
    describe("type", () => {
        structure.callSignatures = structure.callSignatures || [];
        structure.typeArguments = structure.typeArguments || [];
        structure.properties = structure.properties || [];
        structure.definitions = structure.definitions || [];

        it(`should have the text of ${structure.text}`, () => {
            assert.equal(type.text, structure.text);
        });

        it(`should have the same number of call signatures`, () => {
            assert.equal(type.callSignatures.length, structure.callSignatures.length);
        });

        structure.callSignatures.forEach((callSignatureTestStructure, i) => {
            runCallSignatureDefinitionTests(type.callSignatures[i], callSignatureTestStructure);
        });

        it(`should have the same number of type arguments`, () => {
            assert.equal(type.typeArguments.length, structure.typeArguments.length);
        });

        structure.typeArguments.forEach((typeExpressionTestStructure, i) => {
            runTypeExpressionTests(type.typeArguments[i], typeExpressionTestStructure);
        });

        it(`should have the same number of properties`, () => {
            assert.equal(type.properties.length, structure.properties.length);
        });

        structure.properties.forEach((propertyTestStructure, i) => {
            runBasePropertyDefinitionTests(type.properties[i], propertyTestStructure);
        });

        it(`should have the same number of definitions`, () => {
            assert.equal(type.definitions.length, structure.definitions.length);
        });

        structure.definitions.forEach((defTestStructure, i) => {
            it(`definition ${defTestStructure.name}`, () => {
                ensureNotNull(type.definitions[i], () => {
                    runNamedDefinitionTests(type.definitions[i], defTestStructure);
                });
            });
        });
    });
}
