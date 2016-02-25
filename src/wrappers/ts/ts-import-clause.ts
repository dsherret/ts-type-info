import {ImportType} from "./../../definitions";
import {ISymbolNode} from "./../symbol-node";
import {IImportClause} from "./../import-clause";
import {TsBase, TsBaseOptions} from "./ts-base";

export interface TsImportClauseOptions extends TsBaseOptions {
    importType: ImportType;
    symbolNode: ISymbolNode;
    name: string;
    moduleSpecifier: string;
}

export class TsImportClause extends TsBase implements IImportClause {
    private importType: ImportType;
    private symbolNode: ISymbolNode;
    private name: string;
    private moduleSpecifier: string;

    constructor(opts: TsImportClauseOptions) {
        super(opts);

        this.importType = opts.importType;
        this.name = opts.name;
        this.moduleSpecifier = opts.moduleSpecifier;
        this.symbolNode = opts.symbolNode;
    }

    getImportType() {
        return this.importType;
    }

    getModuleSpecifier() {
        return this.moduleSpecifier;
    }

    getName() {
        return this.name;
    }

    getSymbolNode(): ISymbolNode {
        return this.symbolNode;
    }
}
