import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("export default tests", () => {
    describe("expression", () => {
        const code = `export default 23;`;
        const def = getInfoFromString(code);

        runFileDefinitionTests(def, {
            defaultExportExpression: { text: "23" }
        });
    });

    describe("on same line", () => {
        const code = `export default class MyOnSameLineClass {}`;
        const def = getInfoFromString(code);

        runFileDefinitionTests(def, {
            classes: [{
                name: "MyOnSameLineClass",
                isExported: true,
                isDefaultExportOfFile: true
            }]
        });
    });

    describe("on different line", () => {
        const code = `class MyOnDifferentLineClass {}\r\nexport default MyOnDifferentLineClass;`;
        const def = getInfoFromString(code);

        runFileDefinitionTests(def, {
            defaultExportExpression: { text: "MyOnDifferentLineClass" },
            classes: [{
                name: "MyOnDifferentLineClass",
                isExported: true,
                isDefaultExportOfFile: true
            }]
        });
    });

    describe("expression with class", () => {
        const code = `class MyOnDifferentLineClass {}\r\nexport default new MyOnDifferentLineClass();`;
        const def = getInfoFromString(code);

        runFileDefinitionTests(def, {
            defaultExportExpression: { text: "new MyOnDifferentLineClass()" },
            classes: [{
                name: "MyOnDifferentLineClass"
            }]
        });
    });
});
