import {FunctionDefinition} from "./../../../definitions";
import {runNamedDefinitionTests} from "./../../testHelpers";

describe("ParameteredDefinition", () => {
    describe("getParameter", () => {
        const f = new FunctionDefinition();
        f.addParameters({ name: "name1" }, { name: "name2" });
        runNamedDefinitionTests(f.getParameter("name2"), { name: "name2" });
        runNamedDefinitionTests(f.getParameter(d => d.name === "name2"), { name: "name2" });
    });
});
