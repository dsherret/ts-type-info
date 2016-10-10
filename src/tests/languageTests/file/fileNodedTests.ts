import {getInfoFromString} from "./../../../main";
import {runNodedDefinitionTestsForNonNamed} from "./../../testHelpers";

describe("file noded tests", () => {
    const code = `
import * as myImport from "./file";
import myDefault from "./file";
import {NamedImport, AliasedImport as Alias} from "./file";
export * from "./file";
`;

    const def = getInfoFromString(code, {
        includeCompilerNodes: true
    });

    runNodedDefinitionTestsForNonNamed(def);
    runNodedDefinitionTestsForNonNamed(def.imports[0]);
    runNodedDefinitionTestsForNonNamed(def.imports[1].defaultImport!);
    runNodedDefinitionTestsForNonNamed(def.imports[2].namedImports[0]);
    runNodedDefinitionTestsForNonNamed(def.imports[2].namedImports[1]);
    runNodedDefinitionTestsForNonNamed(def.reExports[0]);
});
