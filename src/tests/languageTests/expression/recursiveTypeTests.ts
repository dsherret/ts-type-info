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
                typeExpression: { text: "string" }
            }, {
                name: "note",
                typeExpression: { text: "Note" }
            }],
            methods: [{
                name: "myMethod",
                parameters: [{
                    name: "note",
                    typeExpression: { text: "Note" }
                }],
                returnTypeExpression: { text: "Note[]" }
            }]
        }]
    });
});
