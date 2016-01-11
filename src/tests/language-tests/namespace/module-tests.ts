import {getStringInfo} from "./../../../main";
import {runNamespaceDefinitionTests} from "./../../test-helpers";

describe("namespace tests", () => {
    const code = `
module MyModule {
    export class MyClass {
    }
}`;

    const def = getStringInfo(code);

    runNamespaceDefinitionTests(def.namespaces[0], {
        name: "MyModule",
        classNames: ["MyClass"]
    });
});
