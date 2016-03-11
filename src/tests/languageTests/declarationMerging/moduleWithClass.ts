﻿import {getInfoFromString} from "./../../../main";
import {NamespaceDeclarationType} from "./../../../definitions";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("declaration merging module with class", () => {
    const code = `
module MyModuleWithClass {
    export function myFunction() {}
}

class MyModuleWithClass {
    myMethod() {}
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        namespaces: [{
            name: "MyModuleWithClass",
            declarationType: NamespaceDeclarationType.Module,
            functions: [{
                name: "myFunction",
                isExported: true
            }],
            exports: [{
                name: "myFunction"
            }]
        }],
        classes: [{
            name: "MyModuleWithClass",
            methods: [{
                name: "myMethod"
            }]
        }]
    });
});
