import * as assert from "assert";
import {createVariable} from "./../../../createFunctions";
import {getInfoFromString} from "./../../../main";

const code = `
import myDefaultImport from "./test";
import * as myStarImport from "./test";
import {default as myDefaultImport, myFirstNamedImport, mySecondNamedImport} from "./test";
import myDefaultImport2, {myAlias} from "./test";
import myDefaultImport3, * as myStarImport2 from "./test";
import "./test";

export * from "./test";
export {myExport1, MyActualName as myAlias} from "./test";

var myVariable: string;
var mySecondVariable: number;
type myType = string;
type mySecondType = number;

class MyClass {
}
interface MyInterface {
}
function myFunction() {
}
enum MyEnum {
}
namespace MyNamespace {
}
module MyModule {
}

let myVarAtEndOfFile = "";

export default MyEnum;
`;

describe("FileDefinition", () => {
    const file = getInfoFromString(code);

    // give the import and re-export more information for testing writing "defName as alias"
    const varDef = createVariable({ name: "MyActualName" });
    file.getImport(i => i.defaultImport != null && i.defaultImport.importName === "myDefaultImport2").namedImports[0].definitions.push(varDef);
    file.imports[2].namedImports[0].definitions.push(createVariable({ name: "MyVar", isDefaultExportOfFile: true }));

    describe("write()", () => {
        it("should contain the file written out", () => {
            const expected =
`import myDefaultImport from "./test";
import * as myStarImport from "./test";
import {default as myDefaultImport, myFirstNamedImport, mySecondNamedImport} from "./test";
import myDefaultImport2, {MyActualName as myAlias} from "./test";
import myDefaultImport3, * as myStarImport2 from "./test";
import "./test";

export * from "./test";
export {myExport1, MyActualName as myAlias} from "./test";

var myVariable: string;
var mySecondVariable: number;

type myType = string;
type mySecondType = number;

class MyClass {
}

interface MyInterface {
}

function myFunction() {
}

enum MyEnum {
}

namespace MyNamespace {
}

module MyModule {
}

let myVarAtEndOfFile = "";

export default MyEnum;
`;
            assert.equal(file.write(), expected);
        });
    });
});
