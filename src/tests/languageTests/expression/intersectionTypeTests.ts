import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("intersection type tests", () => {
    const code = `
let test: string | string & number;
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        variables: [{
            name: "test",
            typeExpression: {
                text: "string | (string & number)",
                unionTypeExpressions: [{
                    text: "string"
                }, {
                    text: "string & number",
                    intersectionTypeExpressions: [{
                        text: "string"
                    }, {
                        text: "number"
                    }]
                }]
            }
        }]
    });
});
