import {TsSymbol} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypePropertyBinder} from "./../../base";
import {TsBaseDefinitionBinder} from "./../base/TsBaseDefinitionBinder";
import {TsBasePropertyBinderBySymbol} from "../base/TsBasePropertyBinderBySymbol";

export class TsTypePropertyBinderBySymbol extends TypePropertyBinder {
    constructor(factory: TsFactory, symbol: TsSymbol) {
        super(
            new TsBaseDefinitionBinder(),
            new TsBasePropertyBinderBySymbol(factory, symbol)
        );
    }
}
