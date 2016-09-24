import * as assert from "assert";
import {TypeDefinition} from "./../../../../definitions";
import {TypeTestStructure} from "./../../testStructures";
import {ensureNotNull} from "./../../ensureNotNull";
import {runCallSignatureDefinitionTests} from "./../general";
import {runBaseTypeDefinitionTests} from "./base";
import {runTypeNodeDefinitionTests} from "./runTypeNodeDefinitionTests";

export function runTypeDefinitionTests(definition: TypeDefinition | null, structure: TypeTestStructure) {
    describe("type", () => {
        ensureNotNull(definition, () => {
            runBaseTypeDefinitionTests(definition!, structure, runTypeDefinitionTests);

            if (structure.node != null) {
                describe("node", () => {
                    runTypeNodeDefinitionTests(definition!.node, structure.node!);
                });
            }

            // only bother checking these if they are explictly asked to be checked for
            if (structure.callSignatures != null) {
                it(`should have the same number of call signatures`, () => {
                    assert.equal(definition!.callSignatures.length, structure.callSignatures!.length);
                });

                structure.callSignatures.forEach((callSignatureTestStructure, i) => {
                    describe(`call signature ${i}`, () => {
                        ensureNotNull(definition!.callSignatures[i], () => {
                            runCallSignatureDefinitionTests(definition!.callSignatures[i], callSignatureTestStructure);
                        });
                    });
                });
            }
        });
    });
}
