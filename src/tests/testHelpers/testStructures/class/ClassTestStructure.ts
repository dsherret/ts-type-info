import {BaseTestStructure, NamedTestStructure, DecoratableTestStructure, ExportableTestStructure, TypeParameteredTestStructure, AmbientableTestStructure,
    AbstractableTestStructure, OrderableTestStructure, DocumentationedTestStructure} from "./../base";
import {TypeTestStructure} from "./../expression";
import {ClassMethodTestStructure} from "./ClassMethodTestStructure";
import {ClassPropertyTestStructure} from "./ClassPropertyTestStructure";
import {ClassStaticMethodTestStructure} from "./ClassStaticMethodTestStructure";
import {ClassStaticPropertyTestStructure} from "./ClassStaticPropertyTestStructure";
import {ClassConstructorTestStructure} from "./ClassConstructorTestStructure";

export interface ClassTestStructure extends BaseTestStructure, NamedTestStructure, DecoratableTestStructure, ExportableTestStructure, TypeParameteredTestStructure,
        AmbientableTestStructure, AbstractableTestStructure, OrderableTestStructure, DocumentationedTestStructure {
    methods?: ClassMethodTestStructure[];
    properties?: ClassPropertyTestStructure[];
    staticMethods?: ClassStaticMethodTestStructure[];
    staticProperties?: ClassStaticPropertyTestStructure[];
    constructorDef?: ClassConstructorTestStructure;
    extendsTypes?: TypeTestStructure[];
    implementsTypes?: TypeTestStructure[];
}
