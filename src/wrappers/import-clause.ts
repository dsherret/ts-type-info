import {ISymbol} from "./symbol";
import {ImportType} from "./../definitions";

export interface IImportClause {
    getImportType(): ImportType;
    getModuleSpecifier(): string;
    getName(): string;
    getSymbol(): ISymbol;
}
