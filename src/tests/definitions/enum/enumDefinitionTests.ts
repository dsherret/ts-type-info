import {EnumDefinition} from "./../../../definitions";
import {runEnumMemberDefinitionTests, runNamedDefinitionTests} from "./../../testHelpers";

describe("EnumDefinition", () => {
    describe("addMembers", () => {
        const e = new EnumDefinition();
        e.name = "MyEnum";
        e.addMembers({
            name: "member1",
            value: 5
        }, {
            name: "member2",
            value: 1
        });

        runEnumMemberDefinitionTests(e.members[0], {
            name: "member1",
            value: 5
        });
        runEnumMemberDefinitionTests(e.members[1], {
            name: "member2",
            value: 1
        });
    });

    describe("getMember", () => {
        const e = new EnumDefinition();
        e.addMembers({ name: "name1", value: 1 }, { name: "name2", value: 2 });
        runNamedDefinitionTests(e.getMember("name2"), { name: "name2" });
        runNamedDefinitionTests(e.getMember(d => d.name === "name2"), { name: "name2" });
    });
});
