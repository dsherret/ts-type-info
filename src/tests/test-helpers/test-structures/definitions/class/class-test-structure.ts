import {NamedTestStructure, DecoratableTestStructure, ExportableTestStructure, TypeParameteredTestStructure, AmbientableTestStructure, AbstractableTestStructure} from "./../base";
import {TypeExpressionTestStructure} from "./../../expressions";
import {ClassMethodTestStructure} from "./class-method-test-structure";
import {ClassPropertyTestStructure} from "./class-property-test-structure";
import {ClassStaticMethodTestStructure} from "./class-static-method-test-structure";
import {ClassStaticPropertyTestStructure} from "./class-static-property-test-structure";
import {ClassConstructorTestStructure} from "./class-constructor-test-structure";

export interface ClassTestStructure
        extends NamedTestStructure, DecoratableTestStructure, ExportableTestStructure, TypeParameteredTestStructure, AmbientableTestStructure, AbstractableTestStructure {
    methods?: ClassMethodTestStructure[];
    properties?: ClassPropertyTestStructure[];
    staticMethods?: ClassStaticMethodTestStructure[];
    staticProperties?: ClassStaticPropertyTestStructure[];
    constructorDef?: ClassConstructorTestStructure;
    extendsTypeExpressions?: TypeExpressionTestStructure[];
    implementsTypeExpressions?: TypeExpressionTestStructure[];
}
