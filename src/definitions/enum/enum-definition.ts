import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../utils";
import {EnumMemberDefinition} from "./enum-member-definition";
import {INamedDefinition, NamedDefinition, IAmbientableDefinition, AmbientableDefinition,
        IExportableDefinition, ExportableDefinition} from "./../base";

export class EnumDefinition implements INamedDefinition, IExportableDefinition, IAmbientableDefinition {
    members: EnumMemberDefinition[] = [];

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.fillExportable(typeChecker, symbol);
        this.fillAmbientable(typeChecker, symbol);
        this.fillMembers(typeChecker, symbol);
    }

    private fillMembers(typeChecker: TypeChecker, symbol: ts.Symbol) {
        Object.keys(symbol.exports).forEach(memberName => {
            const member = symbol.exports[memberName];

            /* istanbul ignore else */
            if (EnumMemberDefinition.isEnumMemberDefinition(member)) {
                this.members.push(new EnumMemberDefinition(typeChecker, member));
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
    fillExportable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    isExported: boolean;
    hasExportKeyword: boolean;
    // AmbientableDefinition
    fillAmbientable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
}

applyMixins(EnumDefinition, [NamedDefinition, ExportableDefinition, AmbientableDefinition]);
