import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../utils";
import {EnumMemberDefinition} from "./enum-member-definition";
import {INamedDefinition, NamedDefinition,
        IExportableDefinition, ExportableDefinition} from "./../base";

export class EnumDefinition implements INamedDefinition, IExportableDefinition {
    private _members: EnumMemberDefinition[] = [];

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.fillIsExported(typeChecker, symbol);
        this.fillMembers(typeChecker, symbol);
    }

    get members() {
        return this._members;
    }

    private fillMembers(typeChecker: TypeChecker, symbol: ts.Symbol) {
        Object.keys(symbol.exports).forEach(memberName => {
            const member = symbol.exports[memberName];

            /* istanbul ignore else */
            if (EnumMemberDefinition.isEnumMemberDefinition(member)) {
                this._members.push(new EnumMemberDefinition(typeChecker, member));
            }
            else {
                console.warn(`Unknown enum member: ${symbol.name}`);
            }
        });
    }

    // NamedDefinition
    fillName: (symbol: ts.Symbol) => void;
    name: string;
    // ExportableDefinition
    fillIsExported: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    isExported: boolean;
}

applyMixins(EnumDefinition, [NamedDefinition, ExportableDefinition]);
