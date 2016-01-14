import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("interface extends interface tests", () => {
    const code = `
interface MyBaseInterface {
    name: string;
}

interface MyChildInterface extends MyBaseInterface {
    name2: string;
}
`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        interfaces: [{
            name: "MyBaseInterface",
            properties: [{
                name: "name",
                typeExpression: { text: "string" }
            }]
        }, {
            name: "MyChildInterface",
            extendsTypeExpressions: [{
                text: "MyBaseInterface"
            }],
            properties: [{
                name: "name2",
                typeExpression: { text: "string" }
            }]
        }]
    });
});
