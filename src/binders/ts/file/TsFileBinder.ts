import {FileDefinition, ExportableDefinitions} from "./../../../definitions";
import {MainFactory} from "./../../../factories";
import {TsSourceFile} from "./../../../wrappers";
import {FileBinder} from "./../../base";
import {TsNamedBinder, TsExportableBinder, TsAmbientableBinder, TsModuledBinder} from "./../base";

export class TsFileBinder extends FileBinder {
    constructor(private mainFactory: MainFactory, private sourceFile: TsSourceFile) {
        super(new TsModuledBinder(mainFactory, sourceFile.getNode()));
    }

    getFileName() {
        return this.sourceFile.getFileName();
    }

    getDefaultExport() {
        const symbol = this.sourceFile.getDefaultExportSymbol();

        if (symbol != null) {
            const defsOrExpression = this.mainFactory.getDefinitionsOrExpressionFromExportSymbol(symbol);
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
