import {ImportStructure} from "./../structures";
import {ArrayUtils} from "./ArrayUtils";
import {StringUtils} from "./StringUtils";

export function validateImportStructure(structure: ImportStructure) {
    const isStarImportSet = !StringUtils.isNullOrWhiteSpace(structure.starImportName);
    const isNamedImportSet = !ArrayUtils.isNullOrEmpty(structure.namedImports);

    if (isStarImportSet && isNamedImportSet) {
        throw new Error("You cannot specify namedImports when specifying a starImport.");
    }
}
