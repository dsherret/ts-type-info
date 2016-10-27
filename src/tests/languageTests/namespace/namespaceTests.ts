import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";
import {NamespaceDeclarationType, VariableDeclarationType} from "./../../../definitions";

describe("namespace tests", () => {
    const code = `
/**
 * Some description
 */
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
        export const myInnerVariable = "string";
    }
}
export namespace MyExportedNamespace {
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        namespaces: [{
            name: "MyNamespace",
            documentationComment: "/**\n * Some description\n */",
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
                classes: [
                    { name: "MyInnerNamespaceClass", isExported: true }
                ],
                variables: [{
                    name: "myInnerVariable",
                    isExported: true,
                    declarationType: VariableDeclarationType.Const,
                    defaultExpression: {
                        text: `"string"`
                    },
                    type: {
                        text: "string"
                    }
                }],
                exports: [{
                    name: "MyInnerNamespaceClass"
                }, {
                    name: "myInnerVariable"
                }]
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
            }]
        }, {
            name: "MyExportedNamespace",
            declarationType: NamespaceDeclarationType.Namespace,
            isExported: true,
            isNamedExportOfFile: true
        }],
        exports: [{
            name: "MyExportedNamespace"
        }]
    });
});
