﻿import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("interface exports tests", () => {
    const code = `
export interface MyExportedInterface {
}`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        interfaces: [{
            name: "MyExportedInterface",
            isExported: true,
            isNamedExportOfFile: true
        }],
        exports: [{
            name: "MyExportedInterface"
        }]

    });
});
