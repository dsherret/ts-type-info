import * as assert from "assert";
import {ReExportDefinition, VariableDefinition} from "./../../../definitions";
import {runReExportPartDefinitionTests} from "./../../testHelpers";

describe("ReExportDefinition", () => {
    describe("#addNamedExport()", () => {
        const def = new ReExportDefinition();
        const returnedDef = def.addNamedExport({
            name: "name"
        });
        def.addNamedExport({
            name: "name",
            alias: "aliasName"
        });
        def.addNamedExport({
            definition: { name: "MyDef" } as VariableDefinition
        });
        def.addNamedExport({
            definitions: [{ name: "MyDef2" } as VariableDefinition, { name: "MyDef2" } as VariableDefinition]
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, def.namedExports[0]);
        });

        runReExportPartDefinitionTests(def.namedExports[0], { exportName: "name", definitions: [{ name: "name", type: null }] });
        runReExportPartDefinitionTests(def.namedExports[1], { exportName: "aliasName", definitions: [{ name: "name", type: null }] });
        runReExportPartDefinitionTests(def.namedExports[2], { exportName: "MyDef", definitions: [{ name: "MyDef", type: null }] });
        runReExportPartDefinitionTests(def.namedExports[3], { exportName: "MyDef2", definitions: [{ name: "MyDef2", type: null }, { name: "MyDef2", type: null }] });
    });

    describe("#getNamedExport()", () => {
        const def = new ReExportDefinition();
        def.addNamedExport({
            name: "name",
            alias: "someAlias"
        });
        def.addNamedExport({
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
