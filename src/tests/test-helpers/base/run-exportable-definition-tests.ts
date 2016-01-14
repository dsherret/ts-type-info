import * as assert from "assert";
import {IExportableDefinition} from "./../../../definitions";
import {Exportable} from "./../structures";

export function runExportableDefinitionTests(definition: IExportableDefinition, structure: Exportable) {
    it(`should ${structure.isExported ? "be exported." : "not be exported."}`, () => {
        assert.equal(definition.isExported, structure.isExported || false);
    });
}
