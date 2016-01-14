import {NamedStructure, DecoratableStructure, ExportableStructure, TypeParameteredStructure} from "./../base";
import {ClassMethodStructure} from "./class-method-structure";
import {ClassPropertyStructure} from "./class-property-structure";
import {ClassStaticMethodStructure} from "./class-static-method-structure";
import {ClassStaticPropertyStructure} from "./class-static-property-structure";
import {ConstructorStructure} from "./constructor-structure";
import {TypeExpressionStructure} from "./../../expressions";

export interface ClassStructure extends NamedStructure, DecoratableStructure, ExportableStructure, TypeParameteredStructure {
    methods?: ClassMethodStructure[];
    properties?: ClassPropertyStructure[];
    staticMethods?: ClassStaticMethodStructure[];
    staticProperties?: ClassStaticPropertyStructure[];
    constructorDef?: ConstructorStructure;
    extends?: TypeExpressionStructure[];
    implements?: TypeExpressionStructure[];
}
