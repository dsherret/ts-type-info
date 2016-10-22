import {BaseStructure, NamedStructure, DecoratableStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure,
    AbstractableStructure, JsDocedStructure} from "./../base";
import {ClassMethodStructure} from "./ClassMethodStructure";
import {ClassPropertyStructure} from "./ClassPropertyStructure";
import {ClassStaticMethodStructure} from "./ClassStaticMethodStructure";
import {ClassStaticPropertyStructure} from "./ClassStaticPropertyStructure";
import {ClassConstructorStructure} from "./ClassConstructorStructure";

export interface ClassStructure
        extends BaseStructure, NamedStructure, DecoratableStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure, AbstractableStructure,
            JsDocedStructure {
    methods?: ClassMethodStructure[];
    properties?: ClassPropertyStructure[];
    staticMethods?: ClassStaticMethodStructure[];
    staticProperties?: ClassStaticPropertyStructure[];
    constructorDef?: ClassConstructorStructure;
    extendsTypes?: string[];
    implementsTypes?: string[];
}
