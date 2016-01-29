import * as ts from "typescript";
import CodeBlockWriter from "code-block-writer";
import {applyMixins, TypeChecker} from "./../../utils";
import {EnumMemberDefinition} from "./enum-member-definition";
import {INamedDefinition, NamedDefinition, IAmbientableDefinition, AmbientableDefinition,
        IExportableDefinition, ExportableDefinition} from "./../base";
import {EnumWriter} from "./../../writers";

export class EnumDefinition implements INamedDefinition, IExportableDefinition, IAmbientableDefinition {
    members: EnumMemberDefinition[] = [];

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.fillExportable(typeChecker, symbol);
        this.fillAmbientable(typeChecker, symbol);
        this.fillMembers(typeChecker, symbol);
    }

    write() {
        const writer = new CodeBlockWriter();
        const enumWriter = new EnumWriter(writer);
        enumWriter.write(this);
        return writer.toString();
    }

    private fillMembers(typeChecker: TypeChecker, symbol: ts.Symbol) {
        Object.keys(symbol.exports).forEach(memberName => {
            const memberSymbol = symbol.exports[memberName];

            /* istanbul ignore else */
            if (typeChecker.isEnumMemberSymbol(memberSymbol)) {
                this.members.push(new EnumMemberDefinition(typeChecker, memberSymbol));
            }
            else {
                console.warn(`Unknown enum member: ${symbol.name}`);
            }
        });
    }

    // NamedDefinition
    name: string;
    fillName: (symbol: ts.Symbol) => void;
    // ExportableDefinition
    isExported: boolean;
    hasExportKeyword: boolean;
    fillExportable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
}

applyMixins(EnumDefinition, [NamedDefinition, ExportableDefinition, AmbientableDefinition]);
