import * as assert from "assert";
import {IExportableDefinition} from "./../../../definitions";

export function runExportableDefinitionTests(definition: IExportableDefinition, isExported: boolean) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    it(`should ${isExported ? "be exported." : "not be exported."}`, () => {
        assert.equal(definition.isExported, isExported || false);
    });
}
