import {EnumDefinition} from "./../../../definitions";
import {runEnumMemberDefinitionTests} from "./../../testHelpers";

describe("EnumDefinition", () => {
    describe("addExtends", () => {
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
});
