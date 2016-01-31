import * as ts from "typescript";
import CodeBlockWriter from "code-block-writer";
import {applyMixins, TypeChecker} from "./../../utils";
import {INamedDefinition, NamedDefinition, IExportableDefinition, ExportableDefinition, IAmbientableDefinition, AmbientableDefinition,
        ITypeParameteredDefinition, TypeParameteredDefinition, IModuledDefinition} from "./../base";
import {TypeParameterDefinition} from "./../general";
import {TypeExpression} from "./../../expressions";
import {InterfaceMethodDefinition} from "./interface-method-definition";
import {InterfacePropertyDefinition} from "./interface-property-definition";
import {InterfaceNewSignatureDefinition} from "./interface-new-signature-definition";
import {InterfaceWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";

export class InterfaceDefinition implements INamedDefinition<IModuledDefinition>, IExportableDefinition, ITypeParameteredDefinition<InterfaceDefinition>, IAmbientableDefinition {
    methods: InterfaceMethodDefinition[] = [];
    newSignatures: InterfaceNewSignatureDefinition[] = [];
    properties: InterfacePropertyDefinition[] = [];
    typeParameters: TypeParameterDefinition<InterfaceDefinition>[] = [];

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, public extendsTypeExpressions: TypeExpression[]) {
        this.fillName(typeChecker, symbol);
        this.fillExportable(typeChecker, symbol);
        this.fillMembers(typeChecker, symbol);
        this.fillAmbientable(typeChecker, symbol);
    }

    write() {
        const writer = new CodeBlockWriter();
        const interfaceWriter = new InterfaceWriter(writer);
        interfaceWriter.write(this, WriteFlags.Default);
        return writer.toString();
    }

    private fillMembers(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.typeParameters = [];

        Object.keys(symbol.members).map(memberName => symbol.members[memberName]).forEach(member => {
            /* istanbul ignore else */
            if (typeChecker.isSymbolProperty(member)) {
                this.properties.push(new InterfacePropertyDefinition(typeChecker, member));
            }
            else if (typeChecker.isSymbolInterfaceMethod(member)) {
                this.methods.push(new InterfaceMethodDefinition(typeChecker, member));
            }
            else if (typeChecker.isSymbolTypeParameter(member)) {
                this.typeParameters.push(new TypeParameterDefinition<InterfaceDefinition>(typeChecker, member));
            }
            else if (typeChecker.isSymbolNewSignature(member)) {
                member.getDeclarations().forEach(d => {
                    this.newSignatures.push(new InterfaceNewSignatureDefinition(typeChecker, typeChecker.getSignatureFromDeclaration(d as ts.SignatureDeclaration)));
                });
            }
            else {
                console.warn(`Not implemented interface member: ${member.getName()}`);
            }
        });
    }

    // NamedDefinition
    name: string;
    parent: IModuledDefinition;
    fillName: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    fillExportable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // TypeParameteredDefinition
    fillTypeParametersBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillTypeParametersBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
}

applyMixins(InterfaceDefinition, [NamedDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition]);
