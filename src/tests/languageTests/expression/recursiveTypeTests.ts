import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

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

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "Note",
            properties: [{
                name: "name",
                type: { text: "string" }
            }, {
                name: "note",
                type: { text: "Note" }
            }],
            methods: [{
                name: "myMethod",
                parameters: [{
                    name: "note",
                    type: { text: "Note" }
                }],
                returnType: {
                    text: "Note[]",
                    isArray: true,
                    arrayElementType: { text: "Note" }
                }
            }]
        }]
    });
});
