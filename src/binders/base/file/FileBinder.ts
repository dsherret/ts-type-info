import {FileDefinition, ExpressionDefinition} from "./../../../definitions";
import {ModuledBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class FileBinder implements IBaseBinder {
    constructor(private moduledBinder: ModuledBinder) {
    }

    abstract getFileName(): string;
    abstract getDefaultExportExpression(): ExpressionDefinition;

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
        def.defaultExportExpression = this.getDefaultExportExpression();
    }
}
