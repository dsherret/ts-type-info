import {TsSymbol} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypePropertyBinder} from "./../../base";
import {TsBaseDefinitionBinder} from "./../base/TsBaseDefinitionBinder";
import {TsBasePropertyBinderBySymbol} from "./../base/TsBasePropertyBinderBySymbol";
import {TsNodedBinderNull} from "./../base/TsNodedBinderNull";

export class TsTypePropertyBinderBySymbol extends TypePropertyBinder {
    constructor(factory: TsFactory, symbol: TsSymbol) {
        super(
            new TsBaseDefinitionBinder(),
            new TsBasePropertyBinderBySymbol(factory, symbol),
            new TsNodedBinderNull()
        );
    }
}
