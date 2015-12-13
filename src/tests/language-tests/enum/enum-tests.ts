import {getStringInfo} from "./../../../main";
import {runEnumDefinitionTests} from "./../../test-helpers";

describe("class name tests", () => {
    const code = `
enum MyEnum {
    MyImplicit,
    MyExplicit = 7
}

export enum MyExportedEnum {
}`;

    const def = getStringInfo(code);

    runEnumDefinitionTests(def.enums[0], {
        name: "MyEnum",
        members: [{
            name: "MyImplicit",
            value: 0
        }, {
            name: "MyExplicit",
            value: 7
        }]
    });

    runEnumDefinitionTests(def.enums[1], {
        name: "MyExportedEnum",
        members: [],
        isExported: true
    });
});
