import * as typeConstants from "./../../typeConstants";
import {applyMixins} from "./../../utils";
import {BasePropertyDefinition, NodedDefinition, DocumentationedDefinition} from "./../base";

export class InterfacePropertyDefinition extends BasePropertyDefinition implements NodedDefinition, DocumentationedDefinition {
    // ReSharper disable once InconsistentNaming
    // tslint:disable-next-line:no-unused-variable
    private _interfacePropertyBrand: string; // to make structural typing happy // todo: what other type has the same structure as this?
    // NodedDefinition
    tsNode?: typeConstants.TypeScriptNode;
    // DocumentationedDefinition
    documentationComment: string;
}

applyMixins(InterfacePropertyDefinition, BasePropertyDefinition, [NodedDefinition, DocumentationedDefinition]);
