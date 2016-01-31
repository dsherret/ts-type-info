import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";
import {NamespaceDeclarationType} from "./../../../definitions";

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
export module MyExportedModule {
}`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        namespaces: [{
            name: "MyModule",
            declarationType: NamespaceDeclarationType.Module,
            classes: [
                { name: "MyModuleClass" },
                { name: "MyExportedModuleClass", isExported: true, isNamedExportOfFile: true }
            ],
            enums: [
                { name: "MyModuleEnum" },
                { name: "MyExportedModuleEnum", isExported: true, isNamedExportOfFile: true }
            ],
            functions: [
                { name: "myModuleFunction" },
                { name: "myExportedModuleFunction", isExported: true, isNamedExportOfFile: true }
            ],
            interfaces: [
                { name: "MyModuleInterface" },
                { name: "MyExportedModuleInterface", isExported: true, isNamedExportOfFile: true }
            ],
            namespaces: [{
                name: "MyInnerModule",
                declarationType: NamespaceDeclarationType.Module
            }, {
                name: "MyInnerExportedModule",
                declarationType: NamespaceDeclarationType.Module,
                isExported: true,
                isNamedExportOfFile: true,
                classes: [
                    { name: "MyInnerModuleClass", isExported: true, isNamedExportOfFile: true }
                ],
                exports: [{
                    name: "MyInnerModuleClass"
                }]
            }, {
                name: "MyInnerNamespace",
                declarationType: NamespaceDeclarationType.Namespace
            }, {
                name: "MyInnerExportedNamespace",
                declarationType: NamespaceDeclarationType.Namespace,
                isExported: true,
                isNamedExportOfFile: true,
                classes: [
                    { name: "MyInnerNamespaceClass", isExported: true, isNamedExportOfFile: true }
                ],
                exports: [{
                    name: "MyInnerNamespaceClass"
                }]
            }],
            exports: [{
                name: "MyExportedModuleClass"
            }, {
                name: "MyExportedModuleEnum"
            }, {
                name: "myExportedModuleFunction"
            }, {
                name: "MyExportedModuleInterface"
            }, {
                name: "MyInnerExportedModule"
            }, {
                name: "MyInnerExportedNamespace"
            }]
        }, {
            name: "MyExportedModule",
            declarationType: NamespaceDeclarationType.Module,
            isExported: true,
            isNamedExportOfFile: true
        }],
        exports: [{
            name: "MyExportedModule"
        }]
    });
});
