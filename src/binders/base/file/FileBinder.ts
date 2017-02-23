import {FileDefinition, ExpressionDefinition, ImportDefinition, ReExportDefinition} from "./../../../definitions";
import {BaseDefinitionBinder, ModuledBinder, NodedBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class FileBinder implements IBaseBinder {
    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly moduledBinder: ModuledBinder,
        private readonly nodedBinder: NodedBinder
    ) {
    }

    abstract getFileName(): string;
    abstract getDefaultExportExpression(): ExpressionDefinition | null;
    abstract getImports(): ImportDefinition[];
    abstract getReExports(): ReExportDefinition[];

    bind(def: FileDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.nodedBinder.bind(def);
        def.fileName = this.getFileName();
        def.defaultExportExpression = this.getDefaultExportExpression();
        def.imports = this.getImports();
        def.reExports = this.getReExports();

        this.moduledBinder.bind(def, childDef => {
            if (childDef instanceof ImportDefinition)
                def.imports.push(childDef);
            else if (childDef instanceof ReExportDefinition)
                def.reExports.push(childDef);
        });
    }
}
