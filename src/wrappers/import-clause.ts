import {ISymbolNode} from "./symbol-node";
import {ImportType} from "./../definitions";

export interface IImportClause {
    getImportType(): ImportType;
    getModuleSpecifier(): string;
    getName(): string;
    getSymbolNode(): ISymbolNode;
}
