import * as assert from "assert";
import {TypeDefinition} from "./../../../../definitions";
import {TypeTestStructure} from "./../../testStructures";
import {runNamedDefinitionTests, runBasePropertyDefinitionTests} from "./../base";
import {runCallSignatureDefinitionTests} from "./../function";
import {ensureNotNull} from "./../../ensureNotNull";

export function runTypeTests(type: TypeDefinition, structure: TypeTestStructure) {
    describe("type", () => {
        ensureNotNull(type, () => {
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
                describe(`call signature ${i}`, () => {
                    ensureNotNull(type.callSignatures[i], () => {
                        runCallSignatureDefinitionTests(type.callSignatures[i], callSignatureTestStructure);
                    });
                });
            });

            it(`should have the same number of type arguments`, () => {
                assert.equal(type.typeArguments.length, structure.typeArguments.length);
            });

            structure.typeArguments.forEach((typeTestStructure, i) => {
                runTypeTests(type.typeArguments[i], typeTestStructure);
            });

            it(`should have the same number of properties`, () => {
                assert.equal(type.properties.length, structure.properties.length);
            });

            structure.properties.forEach((propertyTestStructure, i) => {
                describe(`property ${i}`, () => {
                    ensureNotNull(type.properties[i], () => {
                        runBasePropertyDefinitionTests(type.properties[i], propertyTestStructure);
                    });
                });
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
    });
}
