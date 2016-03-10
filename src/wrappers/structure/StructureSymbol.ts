import {ClassPropertyStructure} from "./../../structures";
import {INode} from "./../INode";
import {ISymbol} from "./../ISymbol";
import {ITypeExpression} from "./../ITypeExpression";
import {IType} from "./../IType";
import {StructureSourceFileChild} from "./StructureSourceFileChild";

// add each structure type as it's implemented
type Structures = ClassPropertyStructure;

export class StructureSymbol extends StructureSourceFileChild implements ISymbol {
    constructor(protected structure: Structures) {
        super();
    }

    getName() {
        return this.structure.name || "";
    }

    getAliasSymbol(): ISymbol {
        return null;
    }

    getDeclaredType(): IType {
        return null;
    }

    getExportSymbols(): ISymbol[] {
        return [];
    }

    getExportSymbolsByName(): { [name: string]: ISymbol; } {
        return {};
    }

    getExportSymbolsOfModuleByName(): { [name: string]: ISymbol; } {
        return {};
    }

    getExtendsTypeExpressions(): ITypeExpression[] {
        return [];
    }

    getNodes(): INode[] {
        return [];
    }

    getOnlyNode(): INode {
        return null;
    }

    isAlias() {
        return false;
    }

    isDefaultExport() {
        return false;
    }

    isExported() {
        return false;
    }

    isExportStar() {
        return false;
    }

    isNamedExport() {
        return false;
    }

    isPropertyAccessor() {
        return false;
    }

    isPropertyReadonly() {
        return false;
    }
}
