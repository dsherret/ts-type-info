import * as assert from "assert";
import {ReExportDefinition} from "./../../../definitions";
import {runReExportPartDefinitionTests} from "./../../testHelpers";

describe("ReExportDefinition", () => {
    describe("#addNamedExports()", () => {
        const def = new ReExportDefinition();
        def.addNamedExports({
            name: "name",
            alias: "someAlias"
        }, {
            name: "name2"
        });

        runReExportPartDefinitionTests(def.namedExports[0], { exportName: "someAlias", definitions: [{ name: "name", type: null }] });
        runReExportPartDefinitionTests(def.namedExports[1], { exportName: "name2" });
    });

    describe("#getNamedExport()", () => {
        const def = new ReExportDefinition();
        def.addNamedExports({
            name: "name",
            alias: "someAlias"
        }, {
            name: "name2"
        });

        it("should get the correct named import", () => {
            assert.equal(def.getNamedExport(n => n.exportName === "name2"), def.namedExports[1]);
        });
    });

    describe("#getStarExport()", () => {
        const importDef = new ReExportDefinition();
        importDef.starExports.push({ exportName: "name1" } as any);
        importDef.starExports.push({ exportName: "name2" } as any);

        it("should get the correct star import", () => {
            assert.equal(importDef.getStarExport(n => n.exportName === "name2"), importDef.starExports[1]);
        });
    });
});
