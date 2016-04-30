import * as assert from "assert";
import {ImportDefinition} from "./../../../definitions";
import {runImportPartDefinitionTests} from "./../../testHelpers";

describe("ImportDefinition", () => {
    describe("#setDefaultImport()", () => {
        const importDef = new ImportDefinition();
        importDef.setDefaultImport("defaultImportName");
        runImportPartDefinitionTests(importDef.defaultImport, { importName: "defaultImportName" });
    });

    describe("#addNamedImports()", () => {
        const importDef = new ImportDefinition();
        importDef.addNamedImports({
            name: "name",
            alias: "someAlias"
        }, {
            name: "name2"
        });

        runImportPartDefinitionTests(importDef.namedImports[0], { importName: "someAlias", definitions: [{ name: "name", type: null }] });
        runImportPartDefinitionTests(importDef.namedImports[1], { importName: "name2" });
    });

    describe("#getNamedImport()", () => {
        const importDef = new ImportDefinition();
        importDef.addNamedImports({
            name: "name",
            alias: "someAlias"
        }, {
            name: "name2"
        });

        it("should get the correct named import", () => {
            assert.equal(importDef.getNamedImport(n => n.importName === "name2"), importDef.namedImports[1]);
        });
    });

    describe("#getStarImport()", () => {
        const importDef = new ImportDefinition();
        importDef.starImports.push({ importName: "name1" } as any);
        importDef.starImports.push({ importName: "name2" } as any);

        it("should get the correct star import", () => {
            assert.equal(importDef.getStarImport(n => n.importName === "name2"), importDef.starImports[1]);
        });
    });
});
