import * as ts from "typescript";
import CodeBlockWriter from "code-block-writer";
import {ModuledDefinitions} from "./../../definitions";
import {EnumWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";
import {applyMixins, TypeChecker} from "./../../utils";
import {INamedDefinition, NamedDefinition, IParentedDefinition, IAmbientableDefinition, AmbientableDefinition,
        IExportableDefinition, ExportableDefinition, BaseDefinition, DefinitionType} from "./../base";
import {EnumMemberDefinition} from "./enum-member-definition";

export class EnumDefinition extends BaseDefinition
                            implements INamedDefinition, IParentedDefinition<ModuledDefinitions>, IExportableDefinition, IAmbientableDefinition {
    members: EnumMemberDefinition[] = [];

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(DefinitionType.Enum);
        this.fillName(typeChecker, symbol);
        this.fillExportable(typeChecker, symbol);
        this.fillAmbientable(typeChecker, symbol);
        this.fillMembers(typeChecker, symbol);
    }

    write() {
        const writer = new CodeBlockWriter();
        const enumWriter = new EnumWriter(writer, WriteFlags.Default);
        enumWriter.write(this);
        return writer.toString();
    }

    private fillMembers(typeChecker: TypeChecker, symbol: ts.Symbol) {
        Object.keys(symbol.exports).forEach(memberName => {
            const memberSymbol = symbol.exports[memberName];

            /* istanbul ignore else */
            if (typeChecker.isEnumMemberSymbol(memberSymbol)) {
                this.members.push(new EnumMemberDefinition(typeChecker, memberSymbol, this));
            }
            else {
                console.warn(`Unknown enum member: ${symbol.name}`);
            }
        });
    }

    // NamedDefinition
    name: string;
    fillName: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // IParentedDefinition
    parent: ModuledDefinitions;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    fillExportable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
}

applyMixins(EnumDefinition, [NamedDefinition, ExportableDefinition, AmbientableDefinition]);
