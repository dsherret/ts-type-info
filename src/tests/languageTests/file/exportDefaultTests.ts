import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("export default tests", () => {
    describe("expression", () => {
        const code = `export default 23;`;
        const def = getStringInfo(code);

        runFileDefinitionTests(def, {
            defaultExport: {
                expression: {
                    text: "23"
                },
                definitions: []
            }
        });
    });

    describe("on same line", () => {
        const code = `export default class MyOnSameLineClass {}`;
        const def = getStringInfo(code);

        runFileDefinitionTests(def, {
            defaultExport: {
                expression: null,
                definitions: [{
                    name: "MyOnSameLineClass",
                    isExported: true,
                    isDefaultExportOfFile: true
                }]
            }, classes: [{
                name: "MyOnSameLineClass",
                isExported: true,
                isDefaultExportOfFile: true
            }]
        });
    });

    describe("on different line", () => {
        const code = `class MyOnDifferentLineClass {}\r\nexport default MyOnDifferentLineClass;`;
        const def = getStringInfo(code);

        runFileDefinitionTests(def, {
            defaultExport: {
                expression: null,
                definitions: [{
                    name: "MyOnDifferentLineClass",
                    isExported: true,
                    isDefaultExportOfFile: true
                }]
            }, classes: [{
                name: "MyOnDifferentLineClass",
                isExported: true,
                isDefaultExportOfFile: true
            }]
        });
    });

    describe("expression with class", () => {
        const code = `class MyOnDifferentLineClass {}\r\nexport default new MyOnDifferentLineClass();`;
        const def = getStringInfo(code);

        runFileDefinitionTests(def, {
            defaultExport: {
                expression: {
                    text: "new MyOnDifferentLineClass()"
                },
                definitions: []
            },
            classes: [{
                name: "MyOnDifferentLineClass"
            }]
        });
    });
});
