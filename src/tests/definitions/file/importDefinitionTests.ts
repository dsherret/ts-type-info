import * as assert from "assert";
import {ImportDefinition} from "./../../../definitions";
import {runDefaultImportPartDefinitionTests, runNamedImportPartDefinitionTests} from "./../../testHelpers";

describe("ImportDefinition", () => {
    describe("#setDefaultImport()", () => {
        const importDef = new ImportDefinition();
        importDef.setDefaultImport("defaultImportName");
        runDefaultImportPartDefinitionTests(importDef.defaultImport, { name: "defaultImportName" });
    });

    describe("#addNamedImport()", () => {
        const importDef = new ImportDefinition();
        const returnedDef = importDef.addNamedImport({
            name: "name"
        });
        importDef.addNamedImport({
            name: "name",
            alias: "aliasName"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, importDef.namedImports[0]);
        });

        runNamedImportPartDefinitionTests(importDef.namedImports[0], { name: "name" });
        runNamedImportPartDefinitionTests(importDef.namedImports[1], { name: "name", alias: "aliasName" });
    });

    describe("#getNamedImport()", () => {
        const importDef = new ImportDefinition();
        importDef.addNamedImport({
            name: "name",
            alias: "someAlias"
        });
        importDef.addNamedImport({
            name: "name2"
        });

        it("should get the correct named import", () => {
            assert.equal(importDef.getNamedImport(n => n.name === "name2"), importDef.namedImports[1]);
        });
    });

    describe("#getStarImport()", () => {
        const importDef = new ImportDefinition();
        importDef.starImports.push({ name: "name1" } as any);
        importDef.starImports.push({ name: "name2" } as any);

        it("should get the correct star import", () => {
            assert.equal(importDef.getStarImport(n => n.name === "name2"), importDef.starImports[1]);
        });
    });
});
