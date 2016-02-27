import {ITypeExpression} from "./../type-expression";
import {ClassPropertyStructure} from "./../../structures";
import {INode} from "./../node";
import {ISymbol} from "./../symbol";
import {IType} from "./../type";
import {StructureSourceFileChild} from "./structure-source-file-child";

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

    getEnumMemberSymbols(): ISymbol[] {
        return [];
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
