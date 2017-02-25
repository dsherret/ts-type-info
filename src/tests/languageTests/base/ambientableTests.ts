import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";
import {NamespaceDeclarationType, VariableDeclarationType} from "./../../../definitions";

describe("ambientable tests", () => {
    const code = `
declare class MyAmbientClass {}
declare interface MyAmbientInterface {}
declare function MyAmbientFunction(): void;
declare function MyAmbientFunction(str?: string): void;
declare var MyAmbientVariable;
declare enum MyAmbientEnum {};
declare type MyType = string;
declare namespace MyAmbientNamespace {}
declare module MyAmbientModule {
    class MyClass {
    }
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyAmbientClass",
            isAmbient: true,
            hasDeclareKeyword: true
        }],
        interfaces: [{
            name: "MyAmbientInterface",
            isAmbient: true,
            hasDeclareKeyword: true
        }],
        functions: [{
            name: "MyAmbientFunction",
            isAmbient: true,
            hasDeclareKeyword: true,
            overloadSignatures: [{
                parameters: []
            }, {
                parameters: [{
                    name: "str",
                    isOptional: true,
                    type: { text: "string" }
                }]
            }],
            parameters: [{
                name: "str",
                isOptional: true,
                type: { text: "string" }
            }]
        }],
        variables: [{
            name: "MyAmbientVariable",
            declarationType: VariableDeclarationType.Var,
            isAmbient: true,
            hasDeclareKeyword: true
        }],
        enums: [{
            name: "MyAmbientEnum",
            isAmbient: true,
            hasDeclareKeyword: true
        }],
        typeAliases: [{
            name: "MyType",
            isAmbient: true,
            hasDeclareKeyword: true
        }],
        namespaces: [{
            name: "MyAmbientNamespace",
            declarationType: NamespaceDeclarationType.Namespace,
            isAmbient: true,
            hasDeclareKeyword: true
        }, {
            name: "MyAmbientModule",
            declarationType: NamespaceDeclarationType.Module,
            isAmbient: true,
            hasDeclareKeyword: true,
            classes: [{
                name: "MyClass",
                isAmbient: true,
                hasDeclareKeyword: false,
                isExported: true // anything within an ambient definition is exported
            }],
            exports: [{
                name: "MyClass"
            }]
        }]
    });
});
