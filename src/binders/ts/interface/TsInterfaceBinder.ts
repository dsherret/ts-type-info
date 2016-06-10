import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {tryGet, Logger} from "./../../../utils";
import {InterfaceBinder, InterfaceMemberContainer} from "./../../base";
import {TsBaseDefinitionBinder, TsNamedBinder, TsExportableBinder, TsAmbientableBinder, TsTypeParameteredBinderByNode} from "./../base";

export class TsInterfaceBinder extends InterfaceBinder {
    constructor(private factory: TsFactory, private node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinder(node),
            new TsExportableBinder(node),
            new TsAmbientableBinder(node),
            new TsTypeParameteredBinderByNode(factory, node)
        );
    }

    getExtendsTypeExpressions() {
        return this.node.getChildren()
            .filter(node => node.isHeritageClause() && node.hasExtendsKeyword())
            .map(node => node.getHeritageNodes())
            .reduce((a, b) => a.concat(b), [])
            .map(node => this.factory.getType(node.getType()));
    }

    getMembers() {
        const container = new InterfaceMemberContainer();
        // because there can be multiple method signatures, the last one needs to be used
        const methods: { [name: string]: TsNode } = {};

        this.node.getChildren().forEach(childNode => {
            tryGet(childNode, () => {
                if (childNode.isMethodSignature()) {
                    methods[childNode.getName()] = childNode;
                }
                else if (childNode.isPropertySignature()) {
                    container.properties.push(this.factory.getInterfaceProperty(childNode));
                }
                else if (childNode.isConstructSignature()) {
                    container.newSignatures.push(this.factory.getCallSignatureFromNode(childNode));
                }
                else if (childNode.isCallSignature()) {
                    container.callSignatures.push(this.factory.getCallSignatureFromNode(childNode));
                }
                else if (childNode.isIndexSignature()) {
                    container.indexSignatures.push(this.factory.getIndexSignatureFromNode(childNode));
                }
                else if (childNode.isIdentifier()) {
                    // ignore, it's the interface identifier
                }
                else if (childNode.isTypeParameter()) {
                    // ignore, handled elsewhere
                }
                else if (childNode.isExportKeyword()) {
                    // ignore, handled elsewhere
                }
                else if (childNode.isDefaultKeyword()) {
                    // ignore, handled elsewhere
                }
                else if (childNode.isHeritageClause()) {
                    // ignore, handled elsewhere
                }
                else {
                    Logger.warn(`Unknown interface child kind: ${childNode.nodeKindToString()}`);
                }
            });
        });

        Object.keys(methods).forEach(name => {
            const methodNode = methods[name];
            tryGet(methodNode, () => {
                container.methods.push(this.factory.getInterfaceMethod(methodNode));
            });
        });

        return container;
    }
}
