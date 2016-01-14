import {NamedStructure, DecoratableStructure, ExportableStructure, TypeParameteredStructure} from "./../base";
import {ClassMethodStructure} from "./class-method-structure";
import {ClassPropertyStructure} from "./class-property-structure";
import {StaticMethodStructure} from "./static-method-structure";
import {StaticPropertyStructure} from "./static-property-structure";
import {ConstructorStructure} from "./constructor-structure";
import {TypeExpressionStructure} from "./../../expressions";

export interface ClassStructure extends NamedStructure, DecoratableStructure, ExportableStructure, TypeParameteredStructure {
    methods?: ClassMethodStructure[];
    properties?: ClassPropertyStructure[];
    staticMethods?: StaticMethodStructure[];
    staticProperties?: StaticPropertyStructure[];
    constructorDef?: ConstructorStructure;
    extends?: TypeExpressionStructure[];
    implements?: TypeExpressionStructure[];
}
