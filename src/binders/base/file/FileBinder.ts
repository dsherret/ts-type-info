import {FileDefinition, ExpressionDefinition, ImportDefinition, ReExportDefinition} from "./../../../definitions";
import {BaseDefinitionBinder, ModuledBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class FileBinder implements IBaseBinder {
    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly moduledBinder: ModuledBinder
    ) {
    }

    abstract getFileName(): string;
    abstract getDefaultExportExpression(): ExpressionDefinition | null;
    abstract getImports(): ImportDefinition[];
    abstract getReExports(): ReExportDefinition[];

    bind(def: FileDefinition) {
        this.baseDefinitionBinder.bind(def);
        def.fileName = this.getFileName();
        def.defaultExportExpression = this.getDefaultExportExpression();
        def.imports = this.getImports();
        def.reExports = this.getReExports();

        this.moduledBinder.bind(def, childDef => {
            if (childDef.isImportDefinition()) {
                def.imports.push(childDef);
            }
            else if (childDef.isReExportDefinition()) {
                def.reExports.push(childDef);
            }
        });
    }
}
