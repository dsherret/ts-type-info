import {TsFactory} from "./../../../factories";
import {TsSymbol} from "./../../../compiler";
import {BasePropertyBinder} from "./../../base";
import {TsNamedBinderBySymbol} from "./TsNamedBinderBySymbol";
import {TsOptionalBinderForPropertyBySymbol} from "./TsOptionalBinderForPropertyBySymbol";
import {TsTypedBinderBySymbol} from "./TsTypedBinderBySymbol";
import {TsBaseDefinitionBinder} from "./TsBaseDefinitionBinder";
import {TsReadonlyableBinderForPropertyBySymbol} from "./TsReadonlyableBinderForPropertyBySymbol";

export class TsBasePropertyBinderBySymbol extends BasePropertyBinder {
    constructor(factory: TsFactory, symbol: TsSymbol) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinderBySymbol(symbol),
            new TsOptionalBinderForPropertyBySymbol(symbol),
            new TsTypedBinderBySymbol(factory, symbol),
            new TsReadonlyableBinderForPropertyBySymbol(symbol)
        );
    }
}
