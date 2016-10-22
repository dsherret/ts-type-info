import * as typeConstants from "./../../typeConstants";
import {applyMixins} from "./../../utils";
import {BasePropertyDefinition, NodedDefinition} from "./../base";

export class InterfacePropertyDefinition extends BasePropertyDefinition implements NodedDefinition {
    // ReSharper disable once InconsistentNaming
    // tslint:disable-next-line:no-unused-variable
    private _interfacePropertyBrand: string; // to make structural typing happy // todo: what other type has the same structure as this?
    // NodedDefinition
    tsNode?: typeConstants.TypeScriptNode;
}

applyMixins(InterfacePropertyDefinition, BasePropertyDefinition, [NodedDefinition]);
