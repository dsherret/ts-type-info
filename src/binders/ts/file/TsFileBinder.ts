import {ExportableDefinitions} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {TsSourceFile} from "./../../../compiler";
import {FileBinder} from "./../../base";
import {TsModuledBinder} from "./../base";

export class TsFileBinder extends FileBinder {
    constructor(private tsFactory: TsFactory, private sourceFile: TsSourceFile) {
        super(new TsModuledBinder(tsFactory, sourceFile.getNode()));
    }

    getFileName() {
        return this.sourceFile.getFileName();
    }

    getDefaultExport() {
        const symbol = this.sourceFile.getDefaultExportSymbol();

        if (symbol != null) {
            const defsOrExpression = this.tsFactory.getDefinitionsOrExpressionFromExportSymbol(symbol);
            return {
                definitions: defsOrExpression.definitions as ExportableDefinitions[],
                expression: defsOrExpression.expression
            };
        }
        else {
            return null;
        }
    }
}
