import {getStringInfo} from "./../../../main";
import * as assert from "assert";

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

        it("should exist", () => {
            assert.equal(prop.name, "note");
        });

        it("should have type Note", () => {
            assert.equal(prop.type.name, "Note");
        });
    });
});
