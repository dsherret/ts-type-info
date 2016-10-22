import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("enum tests", () => {
    const code = `
/**
 * Some description
 */
enum MyEnum {
    /**
     * Some description
     */
    MyImplicit,
    MyExplicit = 7
}

export enum MyExportedEnum {
}

const enum MyConstEnum {
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        enums: [{
            name: "MyEnum",
            members: [{
                name: "MyImplicit",
                value: 0,
                jsDocText: "/**\n * Some description\n */"
            }, {
                name: "MyExplicit",
                value: 7
            }],
            jsDocText: "/**\n * Some description\n */"
        }, {
            name: "MyExportedEnum",
            isExported: true,
            isNamedExportOfFile: true
        }, {
            name: "MyConstEnum",
            isConst: true
        }],
        exports: [{
            name: "MyExportedEnum"
        }]
    });
});
