// ----------------------------------
// Code used to generate the example.
//
// Don't read through this code!
// Read readme.md.
// ----------------------------------

import * as fs from "fs";
import * as path from "path";
import {getInfoFromFiles} from "./../../src/main";

const rootDir = path.join(__dirname, "../../");
const mainDir = path.join(rootDir, "examples/strictInterfaces");
const fileName = path.join(mainDir, "input.ts");

// START
const info = getInfoFromFiles([fileName]);
const file = info.getFile(fileName)!;

file.interfaces.forEach(interfaceDef => {
    // old way pre-7.0
    // info.renameDefinitionAs(interfaceDef, interfaceDef.name + "Strict");
    // new way starting in 7.1:
    interfaceDef.name = interfaceDef.name + "Strict";

    interfaceDef.properties.forEach(property => {
        property.isOptional = false;
    });
});

const output = file.write();
// END

const inputText = fs.readFileSync(path.join(mainDir, "input.ts"), "utf8");
const templateText = fs.readFileSync(path.join(mainDir, "template.md"), "utf8");
let codeText = fs.readFileSync(path.join(mainDir, "code.ts"), "utf8");
codeText = codeText.substring(codeText.indexOf("// START") + "// START".length, codeText.indexOf("// END"));
codeText = `import {getInfoFromFiles} from "ts-type-info";\n\nconst fileName = "input.ts";\n` + codeText.replace(/\r?\n/, "").replace(/!/g, "");
const finalText = templateText
    .replace("{{Code}}", codeText.trim())
    .replace("{{Input}}", inputText.trim())
    .replace("{{Output}}", output.trim())
    .replace(/\r?\n/g, "\r\n");

fs.writeFileSync(path.join(mainDir, "readme.md"), finalText);
