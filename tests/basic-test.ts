import * as TypeInfoTS from "./../src/main";
import * as path from "path";

// todo: tests coming soon...

const testFileName = path.join(__dirname, "../../tests/source-files/test-file2.ts");

console.log(JSON.stringify(TypeInfoTS.getFileInfo(testFileName)));