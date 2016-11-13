import {TsSymbol} from "./TsSymbol";
import {TsType} from "./TsType";

enum FormatFlags {
    None = 0,
    ParentIntersection = 1 << 0,
    ParentUnion = 1 << 1,
    InUnionOrIntersection = 1 << 2,
    InTypeAlias = 1 << 3
}

export class TypeToStringWriter {
    getString(type: TsType) {
        let formatFlags = FormatFlags.None;

        if (type.isMainTypeAliasType())
            formatFlags |= FormatFlags.InTypeAlias;

        return this.getStringInternal(type, formatFlags);
    }

    private getStringInternal(type: TsType, formatFlags: FormatFlags): string {
        if ((formatFlags & FormatFlags.InTypeAlias) === 0) {
            const aliasSymbol = type.getAliasSymbol();
            if (aliasSymbol != null)
                return this.getTypeFromSymbol(aliasSymbol, type.getAliasTypeArguments());
        }
        else
            formatFlags &= ~FormatFlags.InTypeAlias;

        if (type.isUnionType() && !type.isEnumType())
            return this.getUnionType(type, formatFlags);
        else if (type.isIntersectionType())
            return this.getIntersectionType(type, formatFlags);

        const symbol = type.getSymbol();

        if (type.isAnonymousFunctionType()) {
            if (formatFlags & FormatFlags.InUnionOrIntersection)
                return `(${type.getTypeCheckerTypeText()})`;

            return type.getTypeCheckerTypeText();
        }
        else if (type.isAnonymousType() && symbol == null)
            return this.getTypeFromObject(type);
        else
            return type.getTypeCheckerTypeText();
    }

    private getTypeFromObject(type: TsType) {
        const props = type.getProperties();
        let str = "{ ";

        props.forEach(prop => {
            if (prop.isPropertyReadonly())
                str += "readonly ";
            str += prop.getName();
            if (prop.isPropertyOptional())
                str += "?";
            str += ": ";
            str += this.getStringInternal(prop.getType(), FormatFlags.None);
            str += "; ";
        });
        str += "}";

        return str;
    }

    private getTypeFromSymbol(symbol: TsSymbol, typeArguments: TsType[]) {
        const parentSymbol = symbol.getParentSymbol();
        let name = symbol.getName();

        if (parentSymbol != null)
            name = `${this.getTypeFromSymbol(parentSymbol, [])}.${name}`;

        if (typeArguments.length === 0)
            return name;

        return `${name}<${typeArguments.map(a => this.getStringInternal(a, FormatFlags.None)).join(", ")}>`;
    }

    private getUnionType(type: TsType, flags: FormatFlags) {
        const childFlags = (flags & ~FormatFlags.ParentIntersection) | FormatFlags.ParentUnion | FormatFlags.InUnionOrIntersection;
        const str = type.getUnionOrIntersectionTypes().map(t => this.getStringInternal(t, childFlags)).join(" | ");

        if (flags & FormatFlags.ParentIntersection)
            return `(${str})`;

        return str;
    }

    private getIntersectionType(type: TsType, flags: FormatFlags) {
        const childFlags = (flags & ~FormatFlags.ParentUnion) | FormatFlags.ParentIntersection | FormatFlags.InUnionOrIntersection;
        const str = type.getUnionOrIntersectionTypes().map(t => this.getStringInternal(t, childFlags)).join(" & ");

        if (flags & FormatFlags.ParentUnion)
            return `(${str})`;

        return str;
    }
}
