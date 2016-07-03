import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";
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
        class MyNonExportedInnerClass {}
    }
    namespace MyInnerNamespace {
    }
    export namespace MyInnerExportedNamespace {
        export class MyInnerNamespaceClass {}
    }
    type myTypeAlias = string;
    export type myExportedTypeAlias = string;
}
export module MyExportedModule {
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        namespaces: [{
            name: "MyModule",
            declarationType: NamespaceDeclarationType.Module,
            classes: [
                { name: "MyModuleClass", order: 0 },
                { name: "MyExportedModuleClass", isExported: true, order: 1 }
            ],
            enums: [
                { name: "MyModuleEnum", order: 2 },
                { name: "MyExportedModuleEnum", isExported: true, order: 3 }
            ],
            functions: [
                { name: "myModuleFunction", order: 4 },
                { name: "myExportedModuleFunction", isExported: true, order: 5 }
            ],
            interfaces: [
                { name: "MyModuleInterface", order: 6 },
                { name: "MyExportedModuleInterface", isExported: true, order: 7 }
            ],
            namespaces: [{
                name: "MyInnerModule",
                declarationType: NamespaceDeclarationType.Module,
                order: 8
            }, {
                name: "MyInnerExportedModule",
                declarationType: NamespaceDeclarationType.Module,
                isExported: true,
                order: 9,
                classes: [
                    { name: "MyInnerModuleClass", isExported: true, order: 0 },
                    { name: "MyNonExportedInnerClass", order: 1 }
                ],
                exports: [{
                    name: "MyInnerModuleClass"
                }]
            }, {
                name: "MyInnerNamespace",
                declarationType: NamespaceDeclarationType.Namespace,
                order: 10
            }, {
                name: "MyInnerExportedNamespace",
                declarationType: NamespaceDeclarationType.Namespace,
                isExported: true,
                order: 11,
                classes: [
                    { name: "MyInnerNamespaceClass", isExported: true, order: 0 }
                ],
                exports: [{
                    name: "MyInnerNamespaceClass"
                }]
            }],
            typeAliases: [{
                name: "myTypeAlias",
                type: { text: "string" },
                order: 12
            }, {
                name: "myExportedTypeAlias",
                type: { text: "string" },
                isExported: true,
                order: 13
            }],
            exports: [{
                name: "MyInnerExportedModule"
            }, {
                name: "MyInnerExportedNamespace"
            }, {
                name: "MyExportedModuleClass"
            }, {
                name: "MyExportedModuleInterface"
            }, {
                name: "MyExportedModuleEnum"
            }, {
                name: "myExportedModuleFunction"
            }, {
                name: "myExportedTypeAlias"
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
