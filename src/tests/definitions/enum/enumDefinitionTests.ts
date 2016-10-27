import * as assert from "assert";
import {EnumDefinition} from "./../../../definitions";
import {runEnumMemberDefinitionTests, runNamedDefinitionTests} from "./../../testHelpers";

describe("EnumDefinition", () => {
    describe("#addMember()", () => {
        const e = new EnumDefinition();
        e.name = "MyEnum";
        const returnedDef = e.addMember({
            name: "member1",
            value: 5,
            documentationComment: "text"
        });
        e.addMember({
            name: "member2",
            value: 1
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, e.members[0]);
        });

        runEnumMemberDefinitionTests(e.members[0], {
            name: "member1",
            value: 5,
            documentationComment: "text"
        });
        runEnumMemberDefinitionTests(e.members[1], {
            name: "member2",
            value: 1
        });
    });

    describe("#getMember()", () => {
        const e = new EnumDefinition();
        e.addMember({ name: "name1", value: 1 });
        e.addMember({ name: "name2", value: 2 });
        runNamedDefinitionTests(e.getMember("name2")!, { name: "name2" });
        runNamedDefinitionTests(e.getMember(d => d.name === "name2")!, { name: "name2" });
    });
});
