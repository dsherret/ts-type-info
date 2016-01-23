import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";
import {NamespaceDeclarationType, VariableDeclarationType} from "./../../../definitions";

describe("ambientable tests", () => {
    const code = `
declare class MyAmbientClass {}
declare interface MyAmbientInterface {}
declare function MyAmbientFunction(): void;
declare var MyAmbientVariable;
declare enum MyAmbientEnum {};
declare namespace MyAmbientNamespace {}
declare module MyAmbientModule {}
`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyAmbientClass",
            isAmbient: true
        }],
        interfaces: [{
            name: "MyAmbientInterface",
            isAmbient: true
        }],
        functions: [{
            name: "MyAmbientFunction",
            isAmbient: true
        }],
        variables: [{
            name: "MyAmbientVariable",
            declarationType: VariableDeclarationType.Var,
            isAmbient: true
        }],
        enums: [{
            name: "MyAmbientEnum",
            isAmbient: true
        }],
        namespaces: [{
            name: "MyAmbientNamespace",
            declarationType: NamespaceDeclarationType.Namespace,
            isAmbient: true
        }, {
            name: "MyAmbientModule",
            declarationType: NamespaceDeclarationType.Module,
            isAmbient: true
        }],
    });
});
