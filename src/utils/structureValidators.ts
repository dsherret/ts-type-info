import {ImportStructure} from "./../structures";
import {ArrayUtils} from "./ArrayUtils";
import {StringUtils} from "./StringUtils";

export function validateImportStructure(structure: ImportStructure) {
    const isStarImportSet = !StringUtils.isNullOrWhiteSpace(structure.starImport);
    const isNamedImportSet = !ArrayUtils.isNullOrEmpty(structure.namedImports);
    const isDefaultImportSet = !StringUtils.isNullOrWhiteSpace(structure.defaultImport);

    if (isStarImportSet) {
        if (isNamedImportSet) {
            throw new Error("You cannot specify namedImports when specifying a starImport.");
        }
        else if (isDefaultImportSet) {
            throw new Error("You cannot specify a defaultImport when specifying a starImport.");
        }
    }

    if (!isStarImportSet && !isNamedImportSet && !isDefaultImportSet) {
        throw new Error("You must specify either a starImport, defaultImport or namedImports.");
    }
}
