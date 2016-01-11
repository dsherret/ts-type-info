import {getStringInfo} from "./../../../main";
import {runNamespaceDefinitionTests} from "./../../test-helpers";

describe("namespace tests", () => {
    const code = `
namespace MyNamespace {
    class MyNamespaceClass {}
    export class MyExportedNamespaceClass {}
    enum MyNamespaceEnum {}
    export enum MyExportedNamespaceEnum {}
    function myNamespaceFunction() {}
    export function myExportedNamespaceFunction() {}
    interface MyNamespaceInterface {}
    export interface MyExportedNamespaceInterface {}
    export namespace MyInnerNamespace {
        export class MyInnerNamespaceClass {}
    }
}
export namespace MyExportedNamespace {
}`;

    const def = getStringInfo(code);

    runNamespaceDefinitionTests(def.namespaces[0], {
        name: "MyNamespace",
        classes: [
            { name: "MyNamespaceClass" },
            { name: "MyExportedNamespaceClass", isExported: true }
        ],
        enums: [
            { name: "MyNamespaceEnum" },
            { name: "MyExportedNamespaceEnum", isExported: true }
        ],
        functions: [
            { name: "myNamespaceFunction" },
            { name: "myExportedNamespaceFunction", isExported: true }
        ],
        interfaces: [
            { name: "MyNamespaceInterface" },
            { name: "MyExportedNamespaceInterface", isExported: true }
        ],
        namespaces: [{
            name: "MyInnerNamespace",
            isExported: true,
            classes: [
                { name: "MyInnerNamespaceClass", isExported: true }
            ]
        }]
    });

    runNamespaceDefinitionTests(def.namespaces[1], {
        name: "MyExportedNamespace",
        isExported: true
    });
});
