import {getStringInfo} from "./../../../main";
import {runNamespaceDefinitionTests} from "./../../test-helpers";

describe("module tests", () => {
    const code = `
module MyModule {
    class MyModuleClass {}
    export class MyExportedModuleClass {}
    enum MyModuleEnum {}
    export enum MyExportedModuleEnum {}
    function myModuleFunction() {}
    export function myExportedModuleFunction() {}
    interface MyModuleInterface {}
    export interface MyExportedModuleInterface {}
    export namespace MyInnerModule {
        export class MyInnerModuleClass {}
    }
}
export module MyExportedModule {
}`;

    const def = getStringInfo(code);

    runNamespaceDefinitionTests(def.namespaces[0], {
        name: "MyModule",
        classes: [
            { name: "MyModuleClass" },
            { name: "MyExportedModuleClass", isExported: true }
        ],
        enums: [
            { name: "MyModuleEnum" },
            { name: "MyExportedModuleEnum", isExported: true }
        ],
        functions: [
            { name: "myModuleFunction" },
            { name: "myExportedModuleFunction", isExported: true }
        ],
        interfaces: [
            { name: "MyModuleInterface" },
            { name: "MyExportedModuleInterface", isExported: true }
        ],
        namespaces: [{
            name: "MyInnerModule",
            isExported: true,
            classes: [
                { name: "MyInnerModuleClass", isExported: true }
            ]
        }]
    });

    runNamespaceDefinitionTests(def.namespaces[1], {
        name: "MyExportedModule",
        isExported: true
    });
});
