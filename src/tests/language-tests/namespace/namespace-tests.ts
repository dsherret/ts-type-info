import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";
import {NamespaceDeclarationType} from "./../../../definitions";

describe("namespace tests", () => {
    const code = `
namespace MyNamespace {
    class MyModuleClass {}
    export class MyExportedModuleClass {}
    enum MyModuleEnum {}
    export enum MyExportedModuleEnum {}
    function myModuleFunction() {}
    export function myExportedModuleFunction() {}
    interface MyModuleInterface {}
    export interface MyExportedModuleInterface {}
    module MyInnerModule {
    }
    export module MyInnerExportedModule {
        export class MyInnerModuleClass {}
    }
    namespace MyInnerNamespace {
    }
    export namespace MyInnerExportedNamespace {
        export class MyInnerNamespaceClass {}
    }
}
export namespace MyExportedNamespace {
}`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        namespaces: [{
            name: "MyNamespace",
            declarationType: NamespaceDeclarationType.Namespace,
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
                declarationType: NamespaceDeclarationType.Module
            }, {
                name: "MyInnerExportedModule",
                declarationType: NamespaceDeclarationType.Module,
                isExported: true,
                classes: [
                    { name: "MyInnerModuleClass", isExported: true }
                ]
            }, {
                name: "MyInnerNamespace",
                declarationType: NamespaceDeclarationType.Namespace
            }, {
                name: "MyInnerExportedNamespace",
                declarationType: NamespaceDeclarationType.Namespace,
                isExported: true,
                classes: [
                    { name: "MyInnerNamespaceClass", isExported: true }
                ]
            }]
        }, {
            name: "MyExportedNamespace",
            declarationType: NamespaceDeclarationType.Namespace,
            isExported: true
        }]
    });
});
