import {ImportDefinition, ReExportDefinition} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {TsSourceFile} from "./../../../compiler";
import {FileBinder} from "./../../base";
import {TsBaseDefinitionBinder, TsModuledBinder} from "./../base";

export class TsFileBinder extends FileBinder {
    constructor(private factory: TsFactory, private sourceFile: TsSourceFile) {
        super(
            new TsBaseDefinitionBinder(),
            new TsModuledBinder(factory, sourceFile.getNode())
        );
    }

    getFileName() {
        return this.sourceFile.getFileName();
    }

    getDefaultExportExpression() {
        const symbol = this.sourceFile.getDefaultExportSymbol();

        if (symbol != null) {
            return this.factory.getExpressionFromExportSymbol(symbol);
        }
        else {
            return null;
        }
    }

    getImports() {
        // binding handled in FileBinder
        return [] as ImportDefinition[];
    }

    getReExports() {
        // binding handled in FileBinder
        return [] as ReExportDefinition[];
    }
}
