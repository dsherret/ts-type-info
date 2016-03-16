import {ExportableDefinitions} from "./../../definitions";
import {Expression} from "./../../expressions";
import {ArrayExt} from "./../../utils";
import {BaseDefinition, DefinitionType, ParentedDefinition} from "./../base";
import {FileDefinition} from "./FileDefinition";

export class ImportDefinition extends BaseDefinition implements ParentedDefinition<FileDefinition> {
    fileName: string;
    moduleSpecifier: string;
    starImportName: string;
    // todo: move the default type and array item types into a ImportPartDefinition class
    defaultImport: { importName: string; definitions: ArrayExt<ExportableDefinitions>; expression: Expression; };
    namedImports = new ArrayExt<{ importName: string; definitions: ArrayExt<ExportableDefinitions>; expression: Expression; }>();
    starImports = new ArrayExt<{ importName: string; definitions: ArrayExt<ExportableDefinitions>; expression: Expression; }>();

    constructor() {
        super(DefinitionType.Import);
    }

    // IParentedDefinition
    parent: FileDefinition;
}
