import {NamespaceDefinition} from "./../../../definitions";
import {runBaseDefinitionTests} from "./../../testHelpers";

describe("BaseDefinition", () => {
    describe("adding onBeforeWrite and onAfterWrite", () => {
        const n = new NamespaceDefinition();
        n.addFunctions({
            name: "name",
            onBeforeWrite: (writer) => writer.write(""),
            onAfterWrite: (writer) => writer.write("")
        });

        runBaseDefinitionTests(n.functions[0], {
            hasOnAfterWrite: true,
            hasOnBeforeWrite: true
        });
    });
});
