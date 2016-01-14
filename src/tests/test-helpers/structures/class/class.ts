import {Named, Decoratable, Exportable, TypeParametered} from "./../base";
import {ClassMethod} from "./class-method";
import {ClassProperty} from "./class-property";
import {StaticMethod} from "./static-method";
import {StaticProperty} from "./static-property";
import {Constructor} from "./constructor";
import {TypeExpressionStructure} from "./../expressions";

export interface Class extends Named, Decoratable, Exportable, TypeParametered {
    methods?: ClassMethod[];
    properties?: ClassProperty[];
    staticMethods?: StaticMethod[];
    staticProperties?: StaticProperty[];
    constructorDef?: Constructor;
    extends?: TypeExpressionStructure[];
    implements?: TypeExpressionStructure[];
}
