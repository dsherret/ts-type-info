import {BaseStructure, NamedStructure} from "./../base";

export interface DecoratorStructure extends BaseStructure, NamedStructure {
    arguments?: string[];
    isDecoratorFactory?: boolean;
}
