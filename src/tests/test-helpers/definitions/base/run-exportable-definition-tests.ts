import * as assert from "assert";
import {IExportableDefinition} from "./../../../../definitions";
import {ExportableStructure} from "./../../structures";

export function runExportableDefinitionTests(definition: IExportableDefinition, structure: ExportableStructure) {
    it(`should ${structure.isExported ? "be exported." : "not be exported."}`, () => {
        assert.equal(definition.isExported, structure.isExported || false);
    });
}
