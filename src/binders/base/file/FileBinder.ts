import {FileDefinition, ImportDefinition, ReExportDefinition, ExportableDefinitions} from "./../../../definitions";
import {Expression} from "./../../../expressions";
import {ArrayExt} from "./../../../utils";
import {ModuledBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class FileBinder implements IBaseBinder {
    constructor(
        private moduledBinder: ModuledBinder
    ) {
    }

    abstract getFileName(): string;
    abstract getDefaultExport(): { expression: Expression; definitions: ExportableDefinitions[] };

    bind(def: FileDefinition) {
        this.moduledBinder.bind(def, childDef => {
            if (childDef.isImportDefinition()) {
                def.imports.push(childDef);
            }
            else if (childDef.isReExportDefinition()) {
                def.reExports.push(childDef);
            }
        });
        def.fileName = this.getFileName();

        const defaultExport = this.getDefaultExport();

        if (defaultExport != null) {
            def.defaultExport = {
                expression: defaultExport.expression,
                definitions: new ArrayExt(...defaultExport.definitions)
            };
        }
    }
}
