import {NamedStructure, DecoratableStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure, AbstractableStructure} from "./../base";
import {TypeExpressionStructure} from "./../../expressions";
import {ClassMethodStructure} from "./class-method-structure";
import {ClassPropertyStructure} from "./class-property-structure";
import {ClassStaticMethodStructure} from "./class-static-method-structure";
import {ClassStaticPropertyStructure} from "./class-static-property-structure";
import {ClassConstructorStructure} from "./class-constructor-structure";

export interface ClassStructure extends NamedStructure, DecoratableStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure, AbstractableStructure {
    methods?: ClassMethodStructure[];
    properties?: ClassPropertyStructure[];
    staticMethods?: ClassStaticMethodStructure[];
    staticProperties?: ClassStaticPropertyStructure[];
    constructorDef?: ClassConstructorStructure;
    extendsTypeExpressions?: TypeExpressionStructure[];
    implementsTypeExpressions?: TypeExpressionStructure[];
}
