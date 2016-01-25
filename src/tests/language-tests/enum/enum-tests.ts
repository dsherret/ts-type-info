import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("enum tests", () => {
    const code = `
enum MyEnum {
    MyImplicit,
    MyExplicit = 7
}

export enum MyExportedEnum {
}`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        enums: [{
            name: "MyEnum",
            members: [{
                name: "MyImplicit",
                value: 0
            }, {
                name: "MyExplicit",
                value: 7
            }]
        }, {
            name: "MyExportedEnum",
            isExported: true,
            hasExportKeyword: true
        }],
        exports: [{
            name: "MyExportedEnum"
        }]
    });
});
