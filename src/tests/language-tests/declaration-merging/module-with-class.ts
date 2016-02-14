import {getStringInfo} from "./../../../main";
import {NamespaceDeclarationType} from "./../../../definitions";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("declaration merging module with class", () => {
    const code = `
module MyModuleWithClass {
    export function myFunction() {}
}

class MyModuleWithClass {
    myMethod() {}
}
`;

    const def = getStringInfo(code);

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
