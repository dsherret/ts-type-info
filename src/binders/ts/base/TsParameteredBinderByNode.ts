import {TsNode} from "./../../../compiler";
import {BaseParameterDefinitionConstructor, BaseParameterDefinition} from "./../../../definitions";
import {MainFactory} from "./../../../factories";
import {ParameteredBinder} from "./../../base";

export interface TsParameterBinderByNodeConstructor<ParameterType extends BaseParameterDefinition<any>> {
    new(mainFactory: MainFactory, node: TsNode): { bind(def: ParameterType): void; };
}

export class TsParameteredBinderByNode<ParameterType extends BaseParameterDefinition<any>> extends ParameteredBinder<ParameterType> {
    constructor(
        private mainFactory: MainFactory,
        private node: TsNode,
        private paramDefinition: BaseParameterDefinitionConstructor<ParameterType>,
        private paramBinder: TsParameterBinderByNodeConstructor<ParameterType>
    ) {
        super();
    }

    getParameters() {
        return this.node.getParameters().map(param => {
            const paramDefinition = new this.paramDefinition();
            const paramBinder = new this.paramBinder(this.mainFactory, param);

            paramBinder.bind(paramDefinition);

            return paramDefinition;
        });
    }
}
