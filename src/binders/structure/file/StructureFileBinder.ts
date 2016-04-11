import {StructureFactory} from "./../../../factories";
import {FileStructure} from "./../../../structures";
import {FileBinder} from "./../../base";
import {StructureModuledBinder} from "./../base";

export class StructureFileBinder extends FileBinder {
    constructor(private factory: StructureFactory, private structure: FileStructure) {
        super(new StructureModuledBinder(factory, structure));
    }

    getFileName() {
        return this.structure.fileName;
    }

    getDefaultExportExpression() {
        return this.factory.getExpressionFromText(this.structure.defaultExportExpression);
    }

    getImports() {
        return (this.structure.imports || []).map(i => this.factory.getImport(i));
    }

    getReExports() {
        return (this.structure.reExports || []).map(r => this.factory.getReExport(r));
    }
}
