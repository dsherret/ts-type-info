import * as assert from "assert";
import {getStringInfo} from "./../../../main";
import {runNamedDefinitionTests} from "./../../test-helpers";

describe("recursive type tests", () => {
    const code = `
class Note {
    name: string;
    note: Note;

    myMethod(note: Note) {
        let notes: Note[];
        return notes;
    }
}
`;

    const def = getStringInfo(code);

    describe("note parameter", () => {
        const prop = def.classes[0].properties[1];

        runNamedDefinitionTests(prop, "note");

        it("should have type Note", () => {
            assert.equal(prop.type.name, "Note");
        });
    });
});
