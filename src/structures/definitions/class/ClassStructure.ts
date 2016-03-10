import {NamedStructure, DecoratableStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure, AbstractableStructure} from "./../base";
import {ClassMethodStructure} from "./ClassMethodStructure";
import {ClassPropertyStructure} from "./ClassPropertyStructure";
import {ClassStaticMethodStructure} from "./ClassStaticMethodStructure";
import {ClassStaticPropertyStructure} from "./ClassStaticPropertyStructure";
import {ClassConstructorStructure} from "./ClassConstructorStructure";

export interface ClassStructure extends NamedStructure, DecoratableStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure, AbstractableStructure {
    methods?: ClassMethodStructure[];
    properties?: ClassPropertyStructure[];
    staticMethods?: ClassStaticMethodStructure[];
    staticProperties?: ClassStaticPropertyStructure[];
    constructorDef?: ClassConstructorStructure;
    extendsTypes?: string[];
    implementsTypes?: string[];
}
