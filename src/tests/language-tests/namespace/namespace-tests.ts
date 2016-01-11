import {getStringInfo} from "./../../../main";
import {runNamespaceDefinitionTests} from "./../../test-helpers";

describe("namespace tests", () => {
    const code = `
namespace MyNamespace {
    export class MyExportedNamespaceClass {
    }
    class MyNonExportedClass {
    }
    namespace MyInnerNamespace {
        export class MyInnerNamespaceClass {
        }
    }
}`;

    const def = getStringInfo(code);

    runNamespaceDefinitionTests(def.namespaces[0], {
        name: "MyNamespace",
        classNames: ["MyExportedNamespaceClass", "MyNonExportedClass"],
        namespaces: [{
            name: "MyInnerNamespace",
            classNames: ["MyInnerNamespaceClass"]
        }]
    });
});
