import * as assert from "assert";
import {IExportableDefinition} from "./../../../../definitions";
import {ExportableStructure} from "./../../structures";

export function runExportableDefinitionTests(definition: IExportableDefinition, structure: ExportableStructure) {
    it(`should ${structure.isExported ? "be" : "not be"} exported.`, () => {
        assert.equal(definition.isExported, structure.isExported || false);
    });

    it(`should ${structure.hasExportKeyword ? "not have" : "have"} the export keyword`, () => {
        assert.equal(definition.hasExportKeyword, structure.hasExportKeyword || false);
    });
}
