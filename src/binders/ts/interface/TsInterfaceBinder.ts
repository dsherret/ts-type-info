import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {tryGet, Logger} from "./../../../utils";
import {InterfaceBinder, InterfaceMemberContainer} from "./../../base";
import {TsBaseDefinitionBinder, TsNamedBinderByNode, TsExportableBinder, TsAmbientableBinder, TsTypeParameteredBinderByNode, TsNodedBinder, TsJsDocedBinder} from "./../base";

export class TsInterfaceBinder extends InterfaceBinder {
    constructor(private readonly factory: TsFactory, private readonly node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinderByNode(node),
            new TsExportableBinder(node),
            new TsAmbientableBinder(node),
            new TsTypeParameteredBinderByNode(factory, node),
            new TsNodedBinder(factory, node),
            new TsJsDocedBinder(node)
        );
    }

    getExtendsTypes() {
        return this.node.getChildren()
            .filter(node => node.isHeritageClause() && node.hasExtendsKeyword())
            .map(node => node.getHeritageTypeNodes())
            .reduce((a, b) => a.concat(b), [])
            .map(typeNode => this.factory.getTypeFromTypeNode(typeNode));
    }

    getMembers() {
        const container = new InterfaceMemberContainer();
        // because there can be multiple method signatures, the last one needs to be used
        const methods: { [nameKey: string]: TsNode[] } = {};

        this.node.getChildren().forEach(childNode => {
            tryGet(childNode, () => {
                if (childNode.isMethodSignature()) {
                    // prefix to prevent collisions
                    const key = childNode.getNameKey();
                    if (typeof methods[key] === "undefined")
                        methods[key] = [];
                    methods[key].push(childNode);
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

        Object.keys(methods).forEach(nameKey => {
            const methodNodes = methods[nameKey];
            tryGet(methodNodes[methodNodes.length - 1], () => {
                container.methods.push(this.factory.getInterfaceMethod(methodNodes));
            });
        });

        return container;
    }
}
