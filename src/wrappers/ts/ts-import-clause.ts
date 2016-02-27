import {ImportType} from "./../../definitions";
import {ISymbol} from "./../symbol";
import {IImportClause} from "./../import-clause";
import {TsBase, TsBaseOptions} from "./ts-base";

export interface TsImportClauseOptions extends TsBaseOptions {
    importType: ImportType;
    symbol: ISymbol;
    name: string;
    moduleSpecifier: string;
}

export class TsImportClause extends TsBase implements IImportClause {
    private importType: ImportType;
    private symbol: ISymbol;
    private name: string;
    private moduleSpecifier: string;

    constructor(opts: TsImportClauseOptions) {
        super(opts);

        this.importType = opts.importType;
        this.name = opts.name;
        this.moduleSpecifier = opts.moduleSpecifier;
        this.symbol = opts.symbol;
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

    getSymbol(): ISymbol {
        return this.symbol;
    }
}
