import {TsFactory} from "./../../../factories";
import {TsSourceFile} from "./../../../compiler";
import {FileBinder} from "./../../base";
import {TsModuledBinder} from "./../base";

export class TsFileBinder extends FileBinder {
    constructor(private factory: TsFactory, private sourceFile: TsSourceFile) {
        super(new TsModuledBinder(factory, sourceFile.getNode()));
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
}
