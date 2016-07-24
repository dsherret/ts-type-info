import * as assert from "assert";
import {ReExportDefinition, VariableDefinition} from "./../../../definitions";
import {runReExportPartDefinitionTests, runNamedImportPartDefinitionTests} from "./../../testHelpers";

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

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, def.namedExports[0]);
        });

        runNamedImportPartDefinitionTests(def.namedExports[0], { name: "name" });
        runNamedImportPartDefinitionTests(def.namedExports[1], { name: "name", alias: "aliasName" });
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
            assert.equal(def.getNamedExport(n => n.name === "name2"), def.namedExports[1]);
        });
    });

    describe("#getStarExport()", () => {
        const importDef = new ReExportDefinition();
        importDef.starExports.push({ name: "name1" } as any);
        importDef.starExports.push({ name: "name2" } as any);

        it("should get the correct star import", () => {
            assert.equal(importDef.getStarExport(n => n.name === "name2"), importDef.starExports[1]);
        });
    });
});
